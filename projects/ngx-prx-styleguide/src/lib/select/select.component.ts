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
  set selected(val: any | any[]) { this._selected = (val instanceof Array) ? val.slice() : val; }
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

  @Output() onSelect = new EventEmitter<string|string[]>();

  onChange() {
    this.onSelect.emit(this.selected);
  }

  ngOnChanges() {
    this.ngSelectOptions = this.convertOptions()
  }

  private convertOptions(): NgOption[] {
    return this.options.map(opt => {
      if (opt instanceof Array) {
        return {name: opt[0], value: opt[1]};
      } else {
        return {name: opt, value: opt};
      }
    });
  }
}