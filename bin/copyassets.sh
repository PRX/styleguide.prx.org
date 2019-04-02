set -e

scss-bundle -e projects/ngx-prx-styleguide/src/assets/styles/base.scss -d dist/ngx-prx-styleguide/assets/styles/bundle.scss
cp -R projects/ngx-prx-styleguide/src/assets/images dist/ngx-prx-styleguide/assets
cp -R projects/ngx-prx-styleguide/src/assets/data dist/ngx-prx-styleguide/data

set +e