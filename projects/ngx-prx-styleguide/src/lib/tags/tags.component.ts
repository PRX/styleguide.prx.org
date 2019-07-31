import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';

interface TagOption {
  name: string;
  value: string;
  tooltip?: string;
}

const isPlainObject = (obj: any): Boolean => (
  typeof obj === 'object' // separate from primitives
    && obj !== null // is obvious
    && obj.constructor === Object // separate instances (Array, DOM, ...)
    && Object.prototype.toString.call(obj) === '[object Object]' // separate build-in like Math
);

@Component({
  selector: 'prx-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnChanges {
  // Populates ng-select model.
  selectedTags: NgOption[] = [];
  // Populates quick tags links.
  quickTags: TagOption[] = [];
  // Quick lookup for quicklinks by value.
  tagsMap: object;

  @Input() options: any[] = [];
  @Input() placeholder = '';

  _selected: any[] = [];
  @Input()
  set selected(val: any[]) { this._selected = (val instanceof Array) ? val.slice() : [val]; }
  get selected() { return this._selected; }

  @Output() change = new EventEmitter<string[]>();

  constructor() { }

  onTagsChange() {
    // Convert new string values from direct input to NgOption.
    this.selectedTags = this.selectedTags.map(tag => isPlainObject(tag) ? tag : this.getTagForValue(tag));
    // Convert selected NgOptions to array of values.
    this.selected = this.selectedTags.map(tag => tag.value);
    // Emit current selected tags.
    this.change.emit(this._selected);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Convert options to tags.
    this.quickTags = this.options.map(this.convertOptionToTag);
    // Update tags map.
    this.tagsMap = this.quickTags.reduce(this.tagMapReducer, {});
    // Convert selected values to tag in tagMap or new tag.
    this.selectedTags = this.selected.map(this.getTagForValue.bind(this));
  }

  toggleTag(tag: TagOption) {
    if (!this.isSelected(tag)) {
      this.selectedTags = [
        ...this.selectedTags,
        this.convertTagToNgOption(tag)
      ];
    } else {
      this.selectedTags = this.selectedTags.filter(selected => selected.value !== tag.value);
    }

    this.onTagsChange();
  }

  isSelected(tag: TagOption) {
    return this.selected.indexOf(tag.value) > -1;
  }

  private convertTagToNgOption(tag: TagOption): NgOption {
    return {
      tag: true,
      name: tag.name,
      value: tag.value
    };
  }

  private getTagForValue(val: any) {
    return this.convertTagToNgOption(this.tagsMap[val] || this.convertOptionToTag(val));
  }

  private tagMapReducer(acc: object, tag: TagOption) {
    return {
      ...acc,
      [tag.value]: tag
    };
  }

  private convertOptionToTag(opt: any): TagOption {
    if (opt instanceof Array) {
      return {
        name: opt[0],
        value: opt[1]
      };
    } else if (isPlainObject(opt)) {
      return {
        ...opt
      };
    } else {
      return {
        name: opt,
        value: opt
      };
    }
  }

}
