import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StickyDirective } from './sticky.directive';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [],
  schemas: [],
  declarations: [
    StickyDirective
  ],
  providers: [],
});

storiesOf('Global|Directives/Sticky', module)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details',
    () => ({
      template: `
      <h1 class="header" prxSticky="all">Page Header</h1>
      <div class="main">
        <aside class="sidebar" prxSticky="sidebar" sticky-offset="16">
          sidebar
        </aside>
        <div class="content">
          <section>
            <h2 class="section_header" prxSticky>Section 1</h2>
            <article>
              <h3 class="article_header" prxSticky>Article 1.1 Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris cursus mattis molestie a iaculis at erat. Tempus quam pellentesque nec nam aliquam sem et. Venenatis urna cursus eget nunc scelerisque viverra mauris. Fermentum leo vel orci porta non pulvinar neque. A cras semper auctor neque vitae tempus. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mauris cursus mattis molestie a iaculis at. Dolor sit amet consectetur adipiscing elit ut. Aliquet nec ullamcorper sit amet risus nullam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Eu facilisis sed odio morbi quis commodo odio aenean. Ultrices dui sapien eget mi. Aliquet bibendum enim facilisis gravida neque. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.</p>

              <p>Ullamcorper velit sed ullamcorper morbi. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Massa vitae tortor condimentum lacinia quis. Lacinia quis vel eros donec ac odio tempor orci. At urna condimentum mattis pellentesque id nibh. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Lobortis feugiat vivamus at augue. Eros in cursus turpis massa tincidunt dui. Tortor posuere ac ut consequat semper viverra nam libero justo. Aliquet enim tortor at auctor urna nunc id. Nunc sed augue lacus viverra vitae congue eu consequat ac.</p>

              <p>Dui vivamus arcu felis bibendum ut. Ut aliquam purus sit amet luctus venenatis. A iaculis at erat pellentesque adipiscing commodo. Quis lectus nulla at volutpat diam ut venenatis tellus. Eu augue ut lectus arcu bibendum at varius vel pharetra. Ante in nibh mauris cursus mattis. Vitae turpis massa sed elementum tempus egestas sed sed risus. Elit eget gravida cum sociis natoque penatibus et. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Vel pharetra vel turpis nunc eget lorem dolor sed. Lectus mauris ultrices eros in cursus turpis.</p>
            </article>
            <article>
              <h3 class="article_header" prxSticky>Article 1.2 Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris cursus mattis molestie a iaculis at erat. Tempus quam pellentesque nec nam aliquam sem et. Venenatis urna cursus eget nunc scelerisque viverra mauris. Fermentum leo vel orci porta non pulvinar neque. A cras semper auctor neque vitae tempus. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mauris cursus mattis molestie a iaculis at. Dolor sit amet consectetur adipiscing elit ut. Aliquet nec ullamcorper sit amet risus nullam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Eu facilisis sed odio morbi quis commodo odio aenean. Ultrices dui sapien eget mi. Aliquet bibendum enim facilisis gravida neque. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.</p>

              <p>Ullamcorper velit sed ullamcorper morbi. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Massa vitae tortor condimentum lacinia quis. Lacinia quis vel eros donec ac odio tempor orci. At urna condimentum mattis pellentesque id nibh. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Lobortis feugiat vivamus at augue. Eros in cursus turpis massa tincidunt dui. Tortor posuere ac ut consequat semper viverra nam libero justo. Aliquet enim tortor at auctor urna nunc id. Nunc sed augue lacus viverra vitae congue eu consequat ac.</p>

              <p>Dui vivamus arcu felis bibendum ut. Ut aliquam purus sit amet luctus venenatis. A iaculis at erat pellentesque adipiscing commodo. Quis lectus nulla at volutpat diam ut venenatis tellus. Eu augue ut lectus arcu bibendum at varius vel pharetra. Ante in nibh mauris cursus mattis. Vitae turpis massa sed elementum tempus egestas sed sed risus. Elit eget gravida cum sociis natoque penatibus et. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Vel pharetra vel turpis nunc eget lorem dolor sed. Lectus mauris ultrices eros in cursus turpis.</p>
            </article>
          </section>
          <section>
            <h2 class="section_header" prxSticky>Section 2</h2>
            <article>
              <h3 class="article_header" prxSticky>Article 2.1 Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris cursus mattis molestie a iaculis at erat. Tempus quam pellentesque nec nam aliquam sem et. Venenatis urna cursus eget nunc scelerisque viverra mauris. Fermentum leo vel orci porta non pulvinar neque. A cras semper auctor neque vitae tempus. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mauris cursus mattis molestie a iaculis at. Dolor sit amet consectetur adipiscing elit ut. Aliquet nec ullamcorper sit amet risus nullam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Eu facilisis sed odio morbi quis commodo odio aenean. Ultrices dui sapien eget mi. Aliquet bibendum enim facilisis gravida neque. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.</p>

              <p>Ullamcorper velit sed ullamcorper morbi. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Massa vitae tortor condimentum lacinia quis. Lacinia quis vel eros donec ac odio tempor orci. At urna condimentum mattis pellentesque id nibh. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Lobortis feugiat vivamus at augue. Eros in cursus turpis massa tincidunt dui. Tortor posuere ac ut consequat semper viverra nam libero justo. Aliquet enim tortor at auctor urna nunc id. Nunc sed augue lacus viverra vitae congue eu consequat ac.</p>

              <p>Dui vivamus arcu felis bibendum ut. Ut aliquam purus sit amet luctus venenatis. A iaculis at erat pellentesque adipiscing commodo. Quis lectus nulla at volutpat diam ut venenatis tellus. Eu augue ut lectus arcu bibendum at varius vel pharetra. Ante in nibh mauris cursus mattis. Vitae turpis massa sed elementum tempus egestas sed sed risus. Elit eget gravida cum sociis natoque penatibus et. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Vel pharetra vel turpis nunc eget lorem dolor sed. Lectus mauris ultrices eros in cursus turpis.</p>
            </article>
            <article>
              <h3 class="article_header" prxSticky>Article 2.2 Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris cursus mattis molestie a iaculis at erat. Tempus quam pellentesque nec nam aliquam sem et. Venenatis urna cursus eget nunc scelerisque viverra mauris. Fermentum leo vel orci porta non pulvinar neque. A cras semper auctor neque vitae tempus. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Mauris cursus mattis molestie a iaculis at. Dolor sit amet consectetur adipiscing elit ut. Aliquet nec ullamcorper sit amet risus nullam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Eu facilisis sed odio morbi quis commodo odio aenean. Ultrices dui sapien eget mi. Aliquet bibendum enim facilisis gravida neque. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.</p>

              <p>Ullamcorper velit sed ullamcorper morbi. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Massa vitae tortor condimentum lacinia quis. Lacinia quis vel eros donec ac odio tempor orci. At urna condimentum mattis pellentesque id nibh. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Lobortis feugiat vivamus at augue. Eros in cursus turpis massa tincidunt dui. Tortor posuere ac ut consequat semper viverra nam libero justo. Aliquet enim tortor at auctor urna nunc id. Nunc sed augue lacus viverra vitae congue eu consequat ac.</p>

              <p>Dui vivamus arcu felis bibendum ut. Ut aliquam purus sit amet luctus venenatis. A iaculis at erat pellentesque adipiscing commodo. Quis lectus nulla at volutpat diam ut venenatis tellus. Eu augue ut lectus arcu bibendum at varius vel pharetra. Ante in nibh mauris cursus mattis. Vitae turpis massa sed elementum tempus egestas sed sed risus. Elit eget gravida cum sociis natoque penatibus et. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Vel pharetra vel turpis nunc eget lorem dolor sed. Lectus mauris ultrices eros in cursus turpis.</p>
            </article>
          </section>
        </div>
      </div>
      `,
      props: {},
      styles: [
        `
        .header {
          z-index: 9;
          margin: 0;
          padding: 0 2rem;
          border-bottom: 5px solid orange;
          background-color: #1a1a1a;
          color: #fff;
          font-weight: bold;
          line-height: 50px;
        }

        .main {
          display: grid;
          grid-template-columns: 200px 1fr;
          grid-column-gap: 1rem;
          padding: 0 20px;
        }

        .sidebar {
          height: 30vh;
          padding: 2rem;
          background: blue;
          color: #fff;
          font-weight: bold;
          text-align: center;
        }

        section {
          padding: 0 2rem 1rem;
        }
        section + section {
          border-top: 3px solid #cdcdcd;
        }
        .section_header {
          z-index: 5;
          margin: 1rem -2rem 0;
          padding: 0 2rem;
          background: #cdcdcd;
          font-weight: bold;
          line-height: 40px;
        }

        article {
          padding: 2rem 1rem 3rem;
        }
        article + article {
          border-top: 1px dotted #1a1a1a;
        }
        .article_header {
          z-index: 2;
          margin: 0;
          padding: 0 1rem;
          background: #f1f1f1;
          border-bottom: 1px solid #cdcdcd;
          font-weight: bold;
          line-height: 40px;
        }
        p {
          margin-top: 1.5rem;
        }
        `
      ]
    }),
    {
      notes: {
        markdown:
`
# Sticky Directive

Attach sticky behavior to an element. Element will remain on screen until its
parent scrolls out of view.

----

__Module__ \`StickyModule\`

__Selector__ \`[prxSticky]\`

----

- \`@Input() prxSelect: string = 'global'\` \\- Group sticky items in groups. Items in the group will stack, sticking to the bottom previously stuck items in the group. Set to \`'all'\` for it to be in all groups.
- \`@Input() sticky-offset: number = 0\` \\- Set space in pixels element should stick from top of window (or other stuck items in the same group.)

----

## Usage

\`\`\`html
<h1 class="header" prxSticky="all">Page Header</h1>
<div class="main">
  <aside class="sidebar" prxSticky="sidebar" sticky-offset="16">
    sidebar
  </aside>
  <div class="content">
    <section>
      <h2 class="section_header" prxSticky>Section 1</h2>
      <article>
        <h3 class="article_header" prxSticky>Article 1.1 Title</h3>
        <p>...</p>
      </article>
      <!-- ... More Articles ... --->
    </section>
    <!-- ... More Sections ... --->
  </div>
</div>
\`\`\`
`
      }
    }
  );