import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';

const isset = (val: any): boolean => val !== false && val !== undefined;

@Component({
  selector: 'prx-select',
  styleUrls: ['select.component.css'],
  templateUrl: 'select.component.html'
})

export class SelectComponent implements OnChanges {
  ngSelectOptions: NgOption[] = [];
  ngSelectSelected: any | any[] = [];
  private haveReceivedInitialOpts = false;

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
  _closeOnSelect = false;
  _clearable = true;
  @Input()
  set disabled(val: boolean) { this._disabled = isset(val); }
  get disabled() { return this._disabled; }
  @Input()
  set searchable(val: boolean) { this._searchable = isset(val); }
  get searchable() { return this._searchable; }
  @Input()
  set single(val: boolean) { this._single = isset(val); }
  get single() { return this._single; }
  @Input()
  set closeOnSelect(val: boolean) { this._closeOnSelect = isset(val); }
  get closeOnSelect() { return this._closeOnSelect; }
  @Input()
  set clearable(val: boolean) { this._clearable = isset(val); }
  get clearable() { return this._clearable; }

  _maxSelectedItems = Infinity;
  @Input()
  set maxSelectedItems(val: number) { this._maxSelectedItems = val; }
  get maxSelectedItems() { return this._maxSelectedItems; }

  @Output() select = new EventEmitter<string|string[]>();

  onChange() {
    this.select.emit(this.ngSelectSelected);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.ngSelectOptions = this.convertOptions();
    // Sometimes the select is initialized without options and receives them later
    // we need to track this in order to accurately filter selected options
    if (simpleChanges.hasOwnProperty('options')) {
      const {previousValue, currentValue} = simpleChanges.options;

      if (!previousValue || (previousValue instanceof Array) && previousValue.length === 0) {
        if ((currentValue instanceof Array) && currentValue.length > 0) {
          this.haveReceivedInitialOpts = true;
        }
      }
    }

    if (this.haveReceivedInitialOpts) {
      const optVals = this.convertOptions().map(opt => opt.value);
      this.ngSelectSelected = this.filterSelected(this.selected, optVals);
    }
  }

  private filterSelected(val: any | any[], optVals: any[]): any | any[] {
    let valFiltered;
    if (val instanceof Array) {
      valFiltered = val.filter(v => optVals.indexOf(v) > -1);
      if (valFiltered.length !== val.length) {
        console.warn(`prx-select: ${JSON.stringify(val)} was filtered to ${JSON.stringify(valFiltered)}`);
      }
    } else {
      valFiltered = optVals.indexOf(val) > -1 ? val : [];
      if (valFiltered !== val) {
        console.warn(`prx-select: ${JSON.stringify(val)} was filtered to ${JSON.stringify(valFiltered)}`);
      }
    }
    return valFiltered;
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
