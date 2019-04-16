set -e

npx scss-bundle -e projects/ngx-prx-styleguide/src/assets/styles/base.scss -d dist/ngx-prx-styleguide/assets/styles/bundle.scss
rsync -a --delete projects/ngx-prx-styleguide/src/assets/images/ dist/ngx-prx-styleguide/assets/images/
rsync -a --delete projects/ngx-prx-styleguide/src/assets/data/ dist/ngx-prx-styleguide/assets/data/

set +e
