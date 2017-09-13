import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

const isset = (val: any): boolean => val !== false && val !== undefined;

@Component({
  moduleId: module.id,
  selector: 'prx-select',
  styleUrls: ['select.component.css'],
  template: `
    <ss-multiselect-dropdown
      [options]="msOptions"
      [texts]="msTexts"
      [settings]="msSettings"
      [(ngModel)]="selected"
      (ngModelChange)="onSelectChange($event)"
      [disabled]="disabled"
      >
    </ss-multiselect-dropdown>
  `
})

export class SelectComponent {

  @Input() options: any[] = [];
  @Input() placeholder = '';
  @Input() titlemax = 4;
  @Input() maxheight = 300;

  // translate selected to array
  _selected: any[] = [];
  @Input()
  set selected(val: any | any[]) { this._selected = (val instanceof Array) ? val : [val]; }
  get selected() { return this._selected; }

  // boolean inputs, i.e. "<prx-select single>"
  _disabled = false;
  _searchable = false;
  _selectall = false;
  _selectnone = false;
  _single = false;
  @Input()
  set disabled(val: boolean) { this._disabled = isset(val); }
  get disabled() { return this._disabled; }
  @Input()
  set searchable(val: boolean) { this._searchable = isset(val); }
  get searchable() { return this._searchable; }
  @Input()
  set selectall(val: boolean) { this._selectall = isset(val); }
  get selectall() { return this._selectall; }
  @Input()
  set selectnone(val: boolean) { this._selectnone = isset(val); }
  get selectnone() { return this._selectnone; }
  @Input()
  set single(val: boolean) { this._single = isset(val); }
  get single() { return this._single; }

  @Output() onSelect = new EventEmitter<any>();

  get msOptions(): IMultiSelectOption[] {
    return this.options.map(opt => {
      if (typeof opt === 'string') {
        return {name: opt, id: opt};
      } else {
        return {name: opt[0], id: opt[1]};
      }
    });
  }

  get msTexts(): IMultiSelectTexts {
    return {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'selected',
      checkedPlural: 'selected',
      searchPlaceholder: 'Filter...',
      defaultTitle: this.placeholder,
      allSelected: 'All selected',
      searchEmptyResult: 'Nothing found...',
      searchNoRenderText: 'Type in search box to see results...'
    };
  }

  get msSettings(): IMultiSelectSettings {
    return {
      enableSearch: this.searchable,
      checkedStyle: 'checkboxes',
      buttonClasses: this.selected.length ? '' : 'placeholder',
      itemClasses: '',
      containerClasses: this.single ? 'single-select' : '',
      selectionLimit: this.single ? 1 : 0,
      autoUnselect: true,
      closeOnSelect: this.single,
      showCheckAll: this.selectall,
      showUncheckAll: this.selectnone,
      dynamicTitleMaxItems: this.titlemax,
      maxHeight: `${this.maxheight}px`,
      displayAllSelectedText: false,
      closeOnClickOutside: true
    };
  }

  onSelectChange() {
    if (this.single) {
      this.onSelect.emit(this.selected[0]);
    } else {
      this.onSelect.emit(this.selected);
    }
  }

}
