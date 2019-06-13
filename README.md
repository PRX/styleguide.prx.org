# PRX Style Guide and Component Library

Generated using the Angular CLI's library support. Uses `ng-packagr` under the
hood and adheres to the Angular Package Format.

## Install Dependencies

Run `npm install`.

## Development Storybook Server

Run `npm run storybook` to start Storybook server. The Storybook server will
automatically detect and load any files ending with `.stories.ts`.

### Writing Stories

Each component should have a `.stories.ts`. Stories files should focus on one
component or concept at a time. For example, the ButtonComponent's stories
should only containing stories that provide usage examples for the button
variations and states. Usage of the button in a menu component should be done
in the menu component's stories.

## Demo App (Deprecated)

Run `npm run demo` for a legacy demo server. Use this as reference when
converting demo pages to stories. Do not add new demo pages. New compoents or
examples of existing components should be done as Storybook stories.

## Running Unit Tests

Run `npm run test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Build

Run `npm run build:lib` to build the library. The build artifacts will be stored
in the `dist/` directory.

You can have Angular's build system monitor for changes and rebuild when they're detected using `npm run build:lib:watch`. Also, if you'd like to use the built library in a Docker container, you can use the post-build watcher: `CONTAINER_NAME=your_name_here npm run postbuild:lib:watch`. This script will watch for the Angular build to complete, bundle in static assets and then attempt to find a running container with a name which matches the provided container name and copy the built files into the `/app/node_modules` directory. To find your container's name, run `docker ps` and look under the `NAMES` columns.

## Usage

To use this library in an angular-cli project:

```
npm install ngx-prx-styleguide
```

Then import the modules you want into your module:

```typescript
import { ChartsModule, DatepickerModule } from 'ngx-prx-styleguide';

@NgModule({
  imports: [ChartsModule, DatepickerModule]
})
```

And add image assets, styles for the base stylesheet, and any components you are
using, to your `angular.json`:

```json
{
  "projects": {
    "your-project": {
      "architect": {
        "your-arch": {
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "node_modules/ngx-prx-styleguide/assets",
                "ignore": ["styles/*"],
                "output": "assets"
              }
            ],
            "styles": [
              "node_modules/pikaday/css/pikaday.css",
              "node_modules/pikaday/css/triangle.css",
              "node_modules/c3/c3.css",
              "node_modules/@ng-select/ng-select/themes/default.theme.css"
              "node_modules/ngx-prx-styleguide/assets/styles/bundle.scss"
            ],
          }
        }
      }
    }
  }
}
```

## Releasing

Once a PR has been reviewed and approved, it's time to release!

The `npm version` command will run scripts to update the library version as
well. To release to the npm registry, publish the `dist/ngx-prx-styleguide`
directory. The `package.json` in the base directory has `private` set to `true`
to prevent accidental publishing.

```
npm version [ major | minor | patch ... ]
npm run build:lib
npm publish dist/ngx-prx-styleguide
```

After the package has been published, push the npm generated commit and tag to
the repository: 
```
git push --follow-tags
```

## License

This library is available as open source under the terms of the
[MIT License](http://opensource.org/licenses/MIT).

## Contributing

Completing a Contributor License Agreement (CLA) is required for PRs to be
accepted.
