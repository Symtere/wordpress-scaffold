wp db export local.sql
wp db import prod.sql
wp search-replace {{{prodUrl}}} {{{projectSlug}}}{{{vhost}}} --all-tables {{#multisite}}--network{{/multisite}}
wp option update blog_public 0
wp rewrite flush