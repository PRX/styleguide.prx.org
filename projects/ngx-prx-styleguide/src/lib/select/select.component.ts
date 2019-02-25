import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgOption, NgSelectConfig } from '@ng-select/ng-select'

const isset = (val: any): boolean => val !== false && val !== undefined;

@Component({
  selector: 'prx-select',
  styleUrls: ['select.component.css'],
  templateUrl: 'selected.component.html'
})

export class SelectComponent implements OnChanges {
  ngSelectOptions: NgOption[] = []

  @Input() options: any[] = [];
  @Input() placeholder = '';

  // translate selected to array
  _selected: any[] = [];
  @Input()
  set selected(val: any | any[]) { this._selected = (val instanceof Array) ? val.slice() : [val]; this.orderSelected() }
  get selected() { return this._selected; }

  // boolean inputs, i.e. "<prx-select single>"
  _disabled = false;
  _searchable = false;
  _single = false;
  @Input()
  set disabled(val: boolean) { this._disabled = isset(val); }
  get disabled() { return this._disabled; }
  @Input()
  set searchable(val: boolean) { this._searchable = isset(val); }
  get searchable() { return this._searchable; }
  @Input()
  set single(val: boolean) { this._single = isset(val); }
  get single() { return this._single; }

  get maxSelectedItems() { return this.single ? 1 : Infinity; }

  @Output() onSelect = new EventEmitter<string|string[]>();

  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
  }

  onChange() {
    this.orderSelected()
    if (this.single) {
      this.onSelect.emit(this.selected[0]);
    } else {
      this.onSelect.emit(this.selected);
    }
  }

  ngOnChanges() {
    this.ngSelectOptions = this.convertOptions()
  }

  private convertOptions(): NgOption[] {
    return this.options.map(opt => {
      if (opt instanceof Array) {
        return {name: opt[0], value: opt[1], id: opt[1]};
      } else {
        return {name: opt, value: opt, id: opt};
      }
    });
  }

  private orderSelected() {
    let ids = this.ngSelectOptions.map(o => o.id);
    this._selected = this._selected.sort((a, b) => {
      return ids.indexOf(a) - ids.indexOf(b);
    });
  }
}