import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface GeneratedSEO {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  schema: Record<string, unknown>;
}

export async function generateSEOForArticle(params: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  url: string;
}): Promise<GeneratedSEO> {
  const { title, excerpt, content, category, author, publishDate, url } = params;

  // Trunchiez conținutul pentru a nu depăși limita de tokeni
  const truncatedContent = content
    .replace(/<[^>]*>/g, "")
    .slice(0, 2000);

  const prompt = `Ești un expert SEO specializat în știri din România. Generează metadate SEO complete și optimizate pentru următorul articol de știri.

ARTICOL:
Titlu: ${title}
Categorie: ${category}
Autor: ${author}
Data: ${publishDate}
URL: ${url}

Rezumat: ${excerpt.replace(/<[^>]*>/g, "")}

Conținut (parțial): ${truncatedContent}

Generează metadate SEO în format JSON strict (fără markdown, fără explicații, doar JSON valid):
{
  "metaTitle": "titlu SEO optimizat max 60 caractere",
  "metaDescription": "descriere meta max 160 caractere, atractivă și cu cuvântul cheie principal",
  "focusKeyword": "cuvântul cheie principal pentru articol",
  "ogTitle": "titlu pentru Open Graph (Facebook/LinkedIn) max 60 caractere",
  "ogDescription": "descriere Open Graph max 200 caractere",
  "twitterTitle": "titlu pentru Twitter Cards max 70 caractere",
  "twitterDescription": "descriere Twitter max 200 caractere",
  "schema": {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "${title}",
    "datePublished": "${publishDate}",
    "author": {"@type": "Person", "name": "${author}"},
    "publisher": {"@type": "Organization", "name": "DottoTV", "url": "https://dottotv.ro"},
    "url": "${url}"
  }
}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  try {
    // Curăț răspunsul de eventuale blocuri markdown
    const cleanJson = textBlock.text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    return JSON.parse(cleanJson) as GeneratedSEO;
  } catch {
    // Fallback cu valori generate din titlu
    const cleanTitle = title.replace(/<[^>]*>/g, "");
    return {
      metaTitle: cleanTitle.slice(0, 60),
      metaDescription: excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
      focusKeyword: cleanTitle.split(" ").slice(0, 3).join(" "),
      ogTitle: cleanTitle.slice(0, 60),
      ogDescription: excerpt.replace(/<[^>]*>/g, "").slice(0, 200),
      twitterTitle: cleanTitle.slice(0, 70),
      twitterDescription: excerpt.replace(/<[^>]*>/g, "").slice(0, 200),
      schema: {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: cleanTitle,
        datePublished: publishDate,
        author: { "@type": "Person", name: author },
        publisher: {
          "@type": "Organization",
          name: "DottoTV",
          url: "https://dottotv.ro",
        },
        url,
      },
    };
  }
}
