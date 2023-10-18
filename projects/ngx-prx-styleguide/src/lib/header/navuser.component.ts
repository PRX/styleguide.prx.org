import { Component, Input } from '@angular/core';
import { Userinfo } from '../auth/userinfo.service';

@Component({
  selector: 'prx-navuser',
  styleUrls: ['./navitem.component.css', './navuser.component.css'],
  template: `
    <div class="nav-holder nav-userinfo">
      <ng-template [ngIf]="userinfo">
        <a>
          <ng-content select=".user-loaded"></ng-content>
        </a>
        <div class="nav-userinfo-menu-apps">
          <h1 class="nav-userinfo-menu-account">{{ userinfo.name }}</h1>
          <ul>
            <li *ngFor="let appName of appNames()">
              <a class="nav-userinfo-app" href="{{ userinfo.apps[appName] }}">{{ appLabel(appName) }}</a>
            </li>
          </ul>
        </div>
      </ng-template>
      <div *ngIf="!userinfo" class="spin-holder">
        <ng-content select=".user-loading"></ng-content>
      </div>
    </div>
  `
})
export class NavUserComponent {
  @Input() userinfo: Userinfo;

  appLabel(appName: string): string {
    return appName;
  }

  appNames(): any[] {
    const names = new Array();
    const thisTld = window.location.hostname.split('.').pop();
    for (const appName in this.userinfo.apps) {
      if (this.userinfo.apps.hasOwnProperty(appName)) {
        const url = this.userinfo.apps[appName];
        const tld = url.split('.').pop();
        if (thisTld === 'org' && tld !== 'org') {
          continue;
        }
        names.push(appName);
      }
    }
    return names;
  }
}
