run:
	npm start

build:
	npm run build

citest:
	PHANTOM=1 npm run test:once

test:
	npm run test:once

clean:
	rm -rf node_modules

install:
	yarn install

all: clean install build

metrics: build
	rsync -r dist/ ../metrics.prx.org/node_modules/ngx-prx-styleguide

publish: build
	rsync -r dist/ ../publish.prx.org/node_modules/ngx-prx-styleguide

.PHONY: run build test clean install all
