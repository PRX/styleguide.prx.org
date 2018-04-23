import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'prx-footer',
  styleUrls: ['footer.component.css'],
  template: `
    <footer>
      <div class="columns">
        <section>
          <div class="footer-left">
            <ng-content></ng-content>
          </div>
        </section>
        <section>
          <h3>Company</h3>
          <a href="https://www.prx.org">PRX</a>
          <a href="https://www.prx.org/company/about">About Us</a>
          <a href="https://medium.com/public-radio-exchange">Blog</a>
          <a href="https://www.prx.org/company/donate">Donate</a>
        </section>
        <section>
          <h3>Support</h3>
          <a href="https://help.prx.org/">Help</a>
          <a href="http://status.prx.org/">Status</a>
          <a href="https://exchange.prx.org/terms-of-use">Terms</a>
          <a href="https://exchange.prx.org/privacy-policy">Privacy</a>
        </section>
        <section>
          <h3>Projects</h3>
          <a href="https://www.radiotopia.fm">Radiotopia</a>
          <a href="https://www.matter.vc">Matter Ventures</a>
        </section>
      </div>
      <ul class="social">
        <li><a href="https://www.prx.org/company/about/#newsletter" class="icon-mail-alt" title="Newsletter"></a></li>
        <li><a href="https://www.twitter.com/prx" class="icon-twitter" title="Twitter"></a></li>
        <li>
          <a href="https://www.facebook.com/publicradioexchange" class="icon-facebook-official" title="Facebook"></a>
        </li>
      </ul>
    </footer>
    `
})

export class FooterComponent {}
