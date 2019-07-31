import { Component } from '@angular/core';

@Component({
  selector: 'app-base-model-demo',
  template: `
    <section class="main demo">
      <h1>BaseModel</h1>
      <p>
        BaseModel is an abstract class that handles our data models and relationships, save and discard, validation,
        and changed indicators. Models should extend from BaseModel and implement <code>key()</code>, <code>related()</code>,
        <code>decode()</code>, <code>encode()</code>, and <code>saveNew(data: &#123;&#125;)</code> methods.
      </p>
      <section>
        <h2>Usage:</h2>
        <ul>
          <li>
            Classes inheriting from BaseModel should call init() in their constructors to set the parent, decode the underlying
            HalDoc, isNew, original values, and RELATIONS
          </li>
          <li>
            Fields that can be modified are to be included in the SETABLE array
          </li>
          <li>
            Validation rules for fields can be set in VALIDATORS
          </li>
          <li>
            <code>key(): string</code> should return a unique key for the instance that is used for localStorage
          </li>
          <li>
            <code>related(): RelatedMap</code> should provide a map of relation keys to related model instances
          </li>
          <li>
            <code>decode(): void</code> is called from the init() method to set the model fields from the HalDoc fields
          </li>
          <li>
            <code>encode(): &#123;&#125;</code> returns an object with the model's data used in persisting the underlying HalDoc
          </li>
          <li>
            <code>saveNew(data: &#123;&#125;): Observable&lt;HalDoc&gt;</code> should call the HalDoc create method
          </li>
        </ul>
      </section>
    </section>
  `,
})
export class BaseModelDemoComponent {}
