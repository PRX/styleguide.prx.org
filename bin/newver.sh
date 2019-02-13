read new_ver
echo "Updating library package.json version (make sure to rebuild): $new_ver"
cd projects/ngx-prx-styleguide
npm version $new_ver --no-git-tag-version 
git add package.json
