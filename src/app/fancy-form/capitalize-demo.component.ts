import { Component } from '@angular/core';

@Component({
  selector: 'capitalize-demo',
  template: `
    <section class="main demo">
      <h1>Capitalize</h1>
      <p>
        The Capitalize Pipe is a pipe that transforms string values to have their first letter capitalized. It is most
        often used on field names and validation messages.
      </p>
      <dl>
        <dt>module</dt><dd><code>FancyFormModule</code></dd>
        <dt>name</dt><dd><code>capitalize</code></dd>
      </dl>
      <aside>
        Usage:
        <pre class="code">
          &lt;span&gt;{{interpolationLiteral}}&lt;/span&gt;
        </pre>
        Example:
        <span>{{ 'description is required' | capitalize }}</span>
      </aside>
    </section>
  `
})

export class CapitalizeDemoComponent {
  interpolationLiteral = '{{ \'description is required\' | capitalize }}';
}
