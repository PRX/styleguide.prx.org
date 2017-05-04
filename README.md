# PRX Style Guide and Component Library

Based on the [Angular QuickStart Lib](https://github.com/filipesilva/angular-quickstart-lib). This lib attempts to adhere to the [Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).

## Install Dependencies

`npm install`

## Development server / Demo app

Run `npm start` for a demo server. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. To release these

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Usage

To use this library in an angular-cli project:

```
npm install --save ngx-prx-styleguide
```

Then import the modules you want into your module:

```typescript
import { ChartsModule, DatepickerModule } from 'ngx-prx-styleguide';

@NgModule({
  imports: [ChartsModule, DatepickerModule]
})
```

And add styles for any components you are using to your `.angular-cli.json`:

```json
{
  "styles": [
    "../node_modules/pikaday/css/pikaday.css",
    "../node_modules/pikaday/css/triangle.css",
    "../node_modules/c3/c3.css",
    "styles.css"
  ]
}
```

## Releasing

To release to npm, *make sure* you do it from the `./dist` folder.

```
npm version patch
npm run build
cd dist/
npm publish
```

## License

The angular lib is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Contributing

Completing a Contributor License Agreement (CLA) is required for PRs to be accepted.
