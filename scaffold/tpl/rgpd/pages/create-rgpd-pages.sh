#!/bin/bash

# Privacy policy page (update or create)
privacy_policy_id=$(wp option get wp_page_for_privacy_policy)
privacy_slug="politique-de-confidentialite"
privacy_content=`cat ${privacy_slug}.html 2>&- || false`
privacy_title="Politique de confidentialité"

if [ "${privacy_content}" ]; then
    if  [ "${privacy_policy_id}" ]; then
        wp post update ${privacy_policy_id} --post_title="$privacy_title" --post_name="${privacy_slug}" --post_content="${privacy_content}" --post_status=publish
    else
        wp post create --post_type=page --post_title="$privacy_title" --post_content="${privacy_content}" --post_status=publish --post_author=1
    fi
else
    echo "path './scaffold/tpl/rgpd' not found ..."
fi

# Other RGPD pages (create)
declare -A arr
arr['les-cookies']="Les cookies"
arr+=( ['mentions-legales']="Mentions légales" )
arr+=( ['demande-de-donnee-personnelles']="Demande de données personnelles" )

for key in ${!arr[@]}; do
    content=`cat ${key}.html 2>&- || false`

    if [ "${content}" ]; then
        wp post create --post_type=page --post_title="${arr[${key}]}" --post_content="${content}" --post_status=publish --post_author=1
    fi
done
