wp db export local.sql
wp db import prod.sql
wp search-replace {{{prodUrl}}} {{{stagingUrl}}} --all-tables {{#multisite}}--network{{/multisite}}
wp option update blog_public 0
wp rewrite flush
wp db export staging.sql
wp db import local.sql