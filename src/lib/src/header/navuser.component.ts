import { Component, Input } from '@angular/core';
import { Userinfo } from '../auth/userinfo.service';

@Component({
  moduleId: module.id,
  selector: 'prx-navuser',
  styleUrls: [
    './navitem.component.css',
    './navuser.component.css'
  ],
  template: `
    <div class="nav-holder nav-userinfo">
      <ng-template [ngIf]="userinfo">
        <a *ngIf="userinfo">
          <span class="name">{{userinfo.preferred_username}}</span>
          <ng-content select=".user-loaded"></ng-content>
        </a>
        <div *ngIf="userinfo" class="nav-userinfo-menu-apps">
          <ul class="nav-userinfo-apps">
            <li><a class="nav-userinfo-app" href="https://exchange.prx.org/">PRX Exchange</a></li>
            <li *ngFor="let appName of appNames();">
              <a class="nav-userinfo-app" href="{{userinfo.apps[appName]}}">{{appLabel(appName)}}</a>
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
    let n = appName.replace(/^https?:\/\//, '').replace(/\..+/, '');
    return 'PRX ' + n.charAt(0).toUpperCase() + n.slice(1);
  }

  appNames(): any[] {
    let names = new Array();
    for (let appName in this.userinfo.apps) {
      names.push(appName);
    }
    return names;
  }
}
