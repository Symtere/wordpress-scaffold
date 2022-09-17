wp db export local.sql
wp db import staging.sql
wp option update blog_public 0
wp search-replace {{{stagingUrl}}} {{{projectSlug}}}{{{vhost}}} --all-tables {{#multisite}}--network{{/multisite}}
wp rewrite flush