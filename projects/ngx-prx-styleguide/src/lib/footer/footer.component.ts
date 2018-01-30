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
          <a href="//www.prx.org/about-us/what-is-prx">About Us</a>
          <a href="//blog.prx.org/">Blog</a>
          <a href="//www.prx.org/about-us/organization">Team</a>
          <a href="//www.prx.org/about-us/press">Press</a>
          <a href="//www.prx.org/about-us/funding">Funding</a>
          <a href="//www.prx.org/donate">Donate</a>
        </section>
        <section>
          <h3>Support</h3>
          <a href="http://help.prx.org/">Help</a>
          <a href="http://status.prx.org/">Status</a>
          <a href="//www.prx.org/terms-of-use">Terms</a>
          <a href="//www.prx.org/privacy-policy">Privacy</a>
        </section>
        <section>
          <h3>Projects</h3>
          <a href="http://www.radiotopia.fm">Radiotopia</a>
          <a href="http://www.matter.vc">Matter Ventures</a>
        </section>
      </div>
      <ul class="social">
        <li><a href="//www.prx.org/newsletters" class="icon-mail-alt" title="Newsletter"></a></li>
        <li><a href="https://www.twitter.com/prx" class="icon-twitter" title="Twitter"></a></li>
        <li>
          <a href="https://www.facebook.com/publicradioexchange" class="icon-facebook-official" title="Facebook"></a>
        </li>
      </ul>
    </footer>
    `
})

export class FooterComponent {}
