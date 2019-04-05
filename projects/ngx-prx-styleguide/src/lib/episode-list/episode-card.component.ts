import { Component, Input } from '@angular/core';

@Component({
  selector: 'prx-episode-card',
  styleUrls: ['./episode-card.component.scss'],
  template: `
    <div class="{{status}} status bar"></div>
    <div class="story-date">{{date | date: dateFormat}}</div>
    <div class="title">
      <h2>
        <a *ngIf="editLink; else nolink" [routerLink]="editLink">{{title || (date | date:"MMM d, y")}}</a>
        <ng-template #nolink>{{title || (date | date:"MMM d, y")}}</ng-template>
      </h2>
      <h3>
        <span *ngIf="teaser" class="teaser">{{teaser}}</span>
        <span *ngIf="status" class="{{status}} status text">{{status}}</span>
      </h3>
    </div>
    <ng-content></ng-content>
  `
})
export class EpisodeCardComponent {
  @Input() date: Date;
  @Input() dateFormat = 'M/d';
  @Input() editLink: string | any[];
  @Input() title: string;
  @Input() teaser: string;
  @Input() status: 'draft' | 'scheduled' | 'published';
}
