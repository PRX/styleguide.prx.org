import { Component } from '@angular/core';

@Component({
  selector: 'app-padzero-demo',
  template: `
    <section class="main demo">
      <h1>PadZero</h1>
      <p>
        The Pad Zero Pipe is a pipe that transforms values to be left zero padded to the given length.
      </p>
      <dl>
        <dt>module</dt><dd><code>FancyFormModule</code></dd>
        <dt>name</dt><dd><code>padzero</code></dd>
      </dl>
      <aside>
        Usage:
        <pre class="code">
          &lt;span&gt;{{interpolationLiteral}}&lt;/span&gt;
        </pre>
        Example:
        <span>{{ 5 | padzero }}</span>
      </aside>
    </section>
  `
})

export class PadZeroDemoComponent {
  interpolationLiteral = '{{ 5 | padzero }}';
}
