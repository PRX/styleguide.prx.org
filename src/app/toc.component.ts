import { Component } from '@angular/core';

@Component({
  selector: 'table-of-contents',
  template: `
    <section class="main demo">
      <section>
        <h2>Navigation</h2>
        <ul>
          <li><h3>HeaderModule</h3>
            <ul>
              <li>
                <a [routerLink]="['header']">HeaderComponent</a> - a fixed position navigation bar that shows
                a home logo link and supports other navigation items using projected content
              </li>
              <li>
                <a [routerLink]="['header/navitem']">NavItemComponent</a> - provides a router link within the application
                or an href link outside the application
              </li>
              <li>
                <a [routerLink]="['header/navuser']">NavUserComponent</a> - shows the username and selector based projected content
              </li>
            </ul>
          </li>
          <li><h3>HeroModule</h3>
            <ul>
              <li>
                <a [routerLink]="['hero']">HeroComponent</a> - shows a banner image, title, status text and navigation elements
              </li>
            </ul>
          </li>
          <li><h3>TabModule</h3>
            <ul>
              <li>
                <a [routerLink]="['tab']">TabComponent</a> - provides tabs for side navigation
              </li>
            </ul>
          </li>
          <li><h3>FooterModule</h3>
            <ul>
              <li>
                <a [routerLink]="['footer']">FooterComponent</a> -  HTML5 footer element containing various PRX links
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <hr>
      <section>
        <h2>Global CSS</h2>
        <ul>
          <li>
            <a [routerLink]="['global/reset']">Reset</a> - resets the styling of HTML elements to a consistent baseline
            to reset the browser's 'user agent' stylesheet
          </li>
          <li><a [routerLink]="['global/app']">App</a> - overall app consistent look and feel</li>
          <li><a [routerLink]="['global/layout']">Layout</a> - base page layout structure</li>
          <li><a [routerLink]="['global/form']">Form</a> - form element styling</li>
          <li><a [routerLink]="['global/button']">Button</a> - global button styling</li>
          <li><a [routerLink]="['global/icons']">Icons</a> - provided icon set</li>
        </ul>
      </section>
      <hr>
      <section>
        <h2>Data Visualization</h2>
        <ul>
          <li><h3>ChartsModule  - C3 chart components</h3>
            <ul>
              <li>
                <a [routerLink]="['charts/indexed']">IndexedChartComponent</a> - charts categorized by their array indices
              </li>
              <li>
                <a [routerLink]="['charts/timeseries']">TimeseriesChartComponent</a> - charts categorized by a consecutive timeseries
              </li>
            </ul>
          </li>
          <li><a [routerLink]="['geo']">Google Geochart Demo</a></li>
        </ul>
      </section>
      <hr>
      <section>
        <h2>PRX Services</h2>
        <ul>
          <li><a [routerLink]="['auth']">Auth</a> - authentication via id.prx.org</li>
          <li><a [routerLink]="['guard']">Guard</a> - services to guard protected routes</li>
          <li><a [routerLink]="['hal']">Hal</a> - base classes for using PRX hal-based services</li>
          <li><a [routerLink]="['modal']">Modal</a> - service and corresponding component for displaying modals</li>
          <li><a [routerLink]="['toastr']">Toastr</a> - displays toast notifications</li>
        </ul>
      </section>
      <hr>
      <section>
        <h2>PRX Models</h2>
        <ul>
          <li><a [routerLink]="['model']">BaseModel</a> - abstract class for data models</li>
        </ul>
      </section>
      <hr>
      <section>
        <h2>Form Controls</h2>
        <ul>
          <li><h3>DatepickerModule</h3>
            <ul>
              <li><a [routerLink]="['form/datepicker']">DatePicker</a> - Pikaday datepicker component</li>
              <li><a [routerLink]="['form/daterange']">DateRange</a> - Pikaday daterange component with "from" and "to" dates</li>
            </ul>
          </li>
          <li><h3>FancyFormModule</h3>
            <ul>
              <li>
                <a [routerLink]="['form/fancy-field']">FancyField</a>
                - form field component designed to work with BaseModel's changed, discard, and validatation features
              </li>
              <li><a [routerLink]="['form/fancy-duration']">FancyDurationField</a> - a form field component for HH:MM:SS duration</li>
              <li>
                <a [routerLink]="['form/advancedconfirm']">AdvancedConfirm</a>
                - a directive that prompts the user to confirm changes to "advanced" fields
              </li>
              <li><a [routerLink]="['form/button']">Fancy Button</a> - button for fancy forms</li>
              <li><a [routerLink]="['form/capitalize']">Capitalize</a> - a pipe used to capitalize field names and validation messages</li>
              <li><a [routerLink]="['form/checkbox']">Fancy Checkbox</a> - checkbox for fancy forms</li>
              <li><a [routerLink]="['form/padzero']">PadZero</a> - a pipe that left pads numbers with zeroes</li>
            </ul>
          </li>
          <li><h3>SelectModule</h3>
            <ul>
              <li><a [routerLink]="['form/select']">Select</a> - styled single/multi selector</li>
            </ul>
          </li>
        </ul>
      </section>
      <hr>
      <section>
        <h2>Images</h2>
        <ul>
          <li>
            <a [routerLink]="['image/imageloader']">ImageLoader</a> - a component that attempts to load
            images and will show a placeholder if it doesn't exist or an error image if an error occurs.
          </li>
        </ul>
      </section>
      <hr>
      <section>
        <h2>Utilities</h2>
        <ul>
          <li>
            <a [routerLink]="['util/spinner']">Spinner</a> - a component that shows a spinning animation to indicate loading status.
          </li>
        </ul>
      </section>
    </section>
  `,
})
export class TocComponent { }
