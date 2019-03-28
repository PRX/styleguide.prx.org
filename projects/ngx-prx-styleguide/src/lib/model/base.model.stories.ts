import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';

storiesOf('MOdels|Base Model', module)
  .addDecorator(centered)
  .add('Overview', () => ({
    template: 'See <strong>Notes</strong> tab for overview.'
  }), {
    notes: {
      markdown: `
# Base Model

\`BaseModel\` is an abstract class that handles our data models and
relationships, save and discard, validation, and changed indicators. Models
should extend from BaseModel and implement key(), related(), decode(), encode(),
and saveNew(data: {}) methods.

----

## Usage

\`\`\`javascript
import { BaseModel, RelatedMap } from './base.model';
import { REQUIRED } from './base.invalid';
import { HalDoc } from '../hal/doc/haldoc';
import { Observable, of as ofasobservableOf } from 'rxjs';

// Models should extend from BaseModel.
class SimpleModel extends BaseModel {
  public foo: string;

  constructor(parent: HalDoc, demo?: HalDoc, loadRelated = true) {
    super();

    // Classes inheriting from BaseModel should call init() in their
    // constructors to set the parent, decode the underlying HalDoc, isNew,
    // original values, and RELATIONS.
    this.init(parent, demo, loadRelated);
  }

  // Fields that can be modified are to be included in the SETABLE array.
  SETABLE = ['foo'];

  // Validation rules for fields can be set in VALIDATORS
  VALIDATORS = {
    mustProvide: [REQUIRED(true)]
  };

  // Should return a unique key for the instance that is used for localStorage.
  key(): string { return 'simple-model'; };

  // Should provide a map of relation keys to related model instances.
  related(): RelatedMap { return {}; };

  // Called from the init() method to set the model fields from the HalDoc fields.
  decode(): void {
    this.foo = this.doc['foo'];
  };

  // Returns an object with the model's data used in persisting the underlying HalDoc.
  encode(): {} { return {}; };

  // Should call the HalDoc create method.
  saveNew(data: {}): Observable<HalDoc> { return ofasobservableOf(this.doc); };
};
const model = new SimpleModel(null, new HalDoc({
  foo: 'bar'
}, null));
\`\`\`
`
    }
  });