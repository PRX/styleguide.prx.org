# PRX Style Guide and Component Library

Generated using the Angular CLI's library support. Uses `ng-packagr` under the hood and adheres to the Angular Package Format.

## Install Dependencies

Run `npm install`.

## Build

Run `npm run build:lib` to build the library. The build artifacts will be stored in the `dist/` directory.

## Development server / Demo app

Run `npm run start` for a demo server. You must first build the library.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

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

And add styles for the base stylesheet, as well as any components you are using, to your `angular.json`:

```json
{
  "styles": [
    "../node_modules/ngx-prx-styleguide/assets/styles/bundle.scss",
    "../node_modules/pikaday/css/pikaday.css",
    "../node_modules/pikaday/css/triangle.css",
    "../node_modules/c3/c3.css",
    "styles.css"
  ]
}
```

## Releasing

The `npm version` command will run scripts to update the library version as well. To release to the npm registry, publish the `dist/ngx-prx-styleguide` directory. The `package.json` in the base directory has `private` set to `true` to prevent accidental publishing.

```
npm version [ major | minor | patch ... ]
npm run build:lib
npm publish dist/ngx-prx-styleguide
```

## License

This library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Contributing

Completing a Contributor License Agreement (CLA) is required for PRs to be accepted.
