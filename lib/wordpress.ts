// ─── Types ───────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  isSticky?: boolean;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  categories: { nodes: { id: string; name: string; slug: string }[] };
  tags?: { nodes: { id: string; name: string; slug: string }[] };
  author: { node: { name: string; avatar: { url: string } } };
  seo?: { title: string; metaDesc: string; focusKw: string };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string;
}

// ─── GraphQL client ───────────────────────────────────────────────────────────

const API_URL =
  process.env.WORDPRESS_API_URL || "https://dottotv.ro/graphql";

async function gql<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: variables ?? {} }),
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`GraphQL HTTP error ${res.status}`);

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error");
  }

  return json.data as T;
}

// ─── Fragments ────────────────────────────────────────────────────────────────

const POST_FIELDS = /* GraphQL */ `
  fragment PostFields on Post {
    databaseId
    slug
    title(format: RENDERED)
    excerpt(format: RENDERED)
    content(format: RENDERED)
    date
    modified
    isSticky
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes {
        databaseId
        name
        slug
      }
    }
    tags {
      nodes {
        databaseId
        name
        slug
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
  }
`;

// ─── Normalizers ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePost(node: any): Post {
  return {
    id: String(node.databaseId),
    slug: node.slug ?? "",
    title: node.title ?? "",
    excerpt: node.excerpt ?? "",
    content: node.content ?? "",
    date: node.date ?? new Date().toISOString(),
    modified: node.modified ?? node.date ?? new Date().toISOString(),
    isSticky: node.isSticky ?? false,
    featuredImage: node.featuredImage ?? null,
    categories: {
      nodes: (node.categories?.nodes ?? []).map((c: any) => ({
        id: String(c.databaseId),
        name: c.name,
        slug: c.slug,
      })),
    },
    tags: {
      nodes: (node.tags?.nodes ?? []).map((t: any) => ({
        id: String(t.databaseId),
        name: t.name,
        slug: t.slug,
      })),
    },
    author: node.author ?? {
      node: { name: "DottoTV", avatar: { url: "" } },
    },
    seo: node.seo ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeCategory(node: any): Category {
  return {
    id: String(node.databaseId),
    name: node.name ?? "",
    slug: node.slug ?? "",
    count: node.count ?? 0,
    description: node.description ?? "",
  };
}

const EXCLUDED_CATEGORY_SLUGS = ["uncategorized", "necategorizat", "dotto-news", "breaking"];

// ─── API ─────────────────────────────────────────────────────────────────────

export async function getLatestPosts(first = 12): Promise<Post[]> {
  const data = await gql<{ posts: { nodes: unknown[] } }>(
    /* GraphQL */ `
      ${POST_FIELDS}
      query GetLatestPosts($first: Int!) {
        posts(
          first: $first
          where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }
        ) {
          nodes {
            ...PostFields
          }
        }
      }
    `,
    { first }
  );
  return (data.posts?.nodes ?? []).map(normalizePost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await gql<{ postBy: unknown }>(
    /* GraphQL */ `
      ${POST_FIELDS}
      query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
          ...PostFields
        }
      }
    `,
    { slug }
  );
  if (!data.postBy) return null;
  return normalizePost(data.postBy);
}

export async function getPostsByCategory(
  categorySlug: string,
  first = 12,
  after?: string
): Promise<{
  posts: Post[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
}> {
  const data = await gql<{
    posts: { nodes: unknown[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
  }>(
    /* GraphQL */ `
      ${POST_FIELDS}
      query GetPostsByCategory($slug: String!, $first: Int!, $after: String) {
        posts(
          first: $first
          after: $after
          where: {
            categoryName: $slug
            orderby: { field: DATE, order: DESC }
            status: PUBLISH
          }
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ...PostFields
          }
        }
      }
    `,
    { slug: categorySlug, first, after: after ?? null }
  );

  return {
    posts: (data.posts?.nodes ?? []).map(normalizePost),
    pageInfo: data.posts?.pageInfo ?? { hasNextPage: false, endCursor: "" },
  };
}

export async function getCategories(): Promise<Category[]> {
  const data = await gql<{ categories: { nodes: unknown[] } }>(
    /* GraphQL */ `
      query GetCategories {
        categories(first: 50, where: { hideEmpty: true, orderby: COUNT, order: DESC }) {
          nodes {
            databaseId
            name
            slug
            count
            description
          }
        }
      }
    `
  );
  return (data.categories?.nodes ?? [])
    .map(normalizeCategory)
    .filter((cat) => !EXCLUDED_CATEGORY_SLUGS.includes(cat.slug));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await gql<{ category: unknown }>(
    /* GraphQL */ `
      query GetCategoryBySlug($slug: ID!) {
        category(id: $slug, idType: SLUG) {
          databaseId
          name
          slug
          count
          description
        }
      }
    `,
    { slug }
  );
  if (!data.category) return null;
  return normalizeCategory(data.category);
}

export async function getBreakingNews(): Promise<
  Pick<Post, "id" | "slug" | "title" | "date">[]
> {
  // Ultimele 15 articole postate, indiferent de categorie
  const posts = await getLatestPosts(15).catch(() => [] as Post[]);
  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: p.date,
  }));
}


export async function getAllPostSlugs(): Promise<string[]> {
  const data = await gql<{ posts: { nodes: { slug: string }[] } }>(
    /* GraphQL */ `
      query GetAllSlugs {
        posts(first: 500, where: { status: PUBLISH }) {
          nodes {
            slug
          }
        }
      }
    `
  );
  return (data.posts?.nodes ?? []).map((n) => n.slug);
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const data = await gql<{ tag: unknown }>(
    /* GraphQL */ `
      query GetTagBySlug($slug: ID!) {
        tag(id: $slug, idType: SLUG) {
          databaseId
          name
          slug
          count
          description
        }
      }
    `,
    { slug }
  );
  if (!data.tag) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = data.tag as any;
  return {
    id: String(t.databaseId),
    name: t.name ?? "",
    slug: t.slug ?? "",
    count: t.count ?? 0,
    description: t.description ?? "",
  };
}

export async function getPostsByTag(
  tagSlug: string,
  first = 12,
  after?: string
): Promise<{
  posts: Post[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
}> {
  const data = await gql<{
    posts: { nodes: unknown[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
  }>(
    /* GraphQL */ `
      ${POST_FIELDS}
      query GetPostsByTag($slug: String!, $first: Int!, $after: String) {
        posts(
          first: $first
          after: $after
          where: {
            tagSlugIn: [$slug]
            orderby: { field: DATE, order: DESC }
            status: PUBLISH
          }
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ...PostFields
          }
        }
      }
    `,
    { slug: tagSlug, first, after: after ?? null }
  );

  return {
    posts: (data.posts?.nodes ?? []).map(normalizePost),
    pageInfo: data.posts?.pageInfo ?? { hasNextPage: false, endCursor: "" },
  };
}

export async function searchPosts(query: string, first = 10): Promise<Post[]> {
  const data = await gql<{ posts: { nodes: unknown[] } }>(
    /* GraphQL */ `
      ${POST_FIELDS}
      query SearchPosts($search: String!, $first: Int!) {
        posts(
          first: $first
          where: { search: $search, status: PUBLISH }
        ) {
          nodes {
            ...PostFields
          }
        }
      }
    `,
    { search: query, first }
  );
  return (data.posts?.nodes ?? []).map(normalizePost);
}
