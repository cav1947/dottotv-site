<?php
/**
 * Plugin Name: DottoTV — Old Slug GraphQL Resolver
 * Description: Adaugă query GraphQL `postByOldSlug` care găsește un post după un slug vechi (_wp_old_slug). Folosit de Next.js pentru redirect 308 când slug-ul unui articol e schimbat în WordPress.
 * Version:     1.0.0
 * Author:      DottoTV
 *
 * INSTALARE:
 *   Copiază acest fișier în wp-content/mu-plugins/ (creează folderul dacă nu există).
 *   Nu necesită activare — mu-plugins se încarcă automat.
 *   Cerință: WPGraphQL trebuie să fie activ.
 *
 * VERIFICARE:
 *   În GraphiQL IDE rulează:
 *     { postByOldSlug(slug: "slug-vechi-cunoscut") { slug title } }
 *   Trebuie să întoarcă post-ul cu slug-ul curent.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('graphql_register_types', function () {
    register_graphql_field('RootQuery', 'postByOldSlug', [
        'type'        => 'Post',
        'description' => 'Găsește un post după un slug vechi salvat în postmeta _wp_old_slug. Întoarce post-ul curent (cu slug-ul nou).',
        'args'        => [
            'slug' => [
                'type'        => ['non_null' => 'String'],
                'description' => 'Slug-ul vechi al articolului',
            ],
        ],
        'resolve'     => function ($source, $args) {
            global $wpdb;

            $old_slug = sanitize_title($args['slug']);
            if (empty($old_slug)) {
                return null;
            }

            // ORDER BY meta_id DESC ca să prindem cel mai recent redirect dintr-un lanț
            // (slug A → B → C: căutarea după A sau B întoarce post-ul curent cu slug C).
            $post_id = $wpdb->get_var($wpdb->prepare(
                "SELECT pm.post_id
                 FROM {$wpdb->postmeta} pm
                 INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id
                 WHERE pm.meta_key = '_wp_old_slug'
                   AND pm.meta_value = %s
                   AND p.post_status = 'publish'
                   AND p.post_type = 'post'
                 ORDER BY pm.meta_id DESC
                 LIMIT 1",
                $old_slug
            ));

            if (!$post_id) {
                return null;
            }

            return \WPGraphQL\Data\DataSource::resolve_post_object((int) $post_id, 'post');
        },
    ]);
});
