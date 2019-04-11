import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prx-status-bar-icon',
  templateUrl: './status-bar-icon.component.html',
  styleUrls: ['./status-bar-icon.component.scss']
})
export class StatusBarIconComponent {

  @Input() name: string;
  @Input() color: string;

  constructor() { }

}
