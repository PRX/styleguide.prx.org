import { Component } from '@angular/core';

@Component({
  selector: 'app-tags-demo',
  templateUrl: './tags-demo.component.html',
  styleUrls: ['./tags-demo.component.css']
})
export class TagsDemoComponent {
  specialTags = [
    {name: 'Ad-Free', value: 'adfree', tooltip: 'Informs some distributions to not include ads.'},
    'promo',
    ['Bonus Episode', 'bonus']
  ];
  selected = ['foo'];

  onTagsChange(tags: string[]) {
    this.selected = tags.slice();
  }

}
