import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'prx-icon-chevron',
  templateUrl: './icon-chevron.component.html',
  styleUrls: ['./icon-chevron.component.scss']
})
export class IconChevronComponent extends IconComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
