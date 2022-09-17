wp db export local.sql
wp option update blog_public 1
wp search-replace {{{projectSlug}}}{{{vhost}}} {{{prodUrl}}} --all-tables
wp rewrite flush
wp db export prod.sql
wp db import local.sql