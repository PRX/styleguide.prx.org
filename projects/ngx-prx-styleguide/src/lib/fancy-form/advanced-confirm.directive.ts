import { Directive, Input, HostListener } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { BaseModel } from '../model/base.model';

@Directive({
  selector: '[prxAdvancedConfirm]'
})

export class AdvancedConfirmDirective {

  @Input() prxAdvancedConfirm: string;
  @Input() prxModel: BaseModel;
  @Input() prxName: string;
  @Input() prxEvent = 'blur';

  @HostListener('blur') onBlur() { return this.prxEvent === 'blur' && this.confirm(); }
  @HostListener('change') onChange() { return this.prxEvent === 'change' && this.confirm(); }

  constructor(private modal: ModalService) {}

  confirm() {
    if (this.prxAdvancedConfirm && this.shouldConfirm()) {
      this.modal.confirm('', this.prxAdvancedConfirm, this.resetFieldOnCancel.bind(this));
    }
  }

  shouldConfirm(): boolean {
    return (this.prxModel && this.prxName)
      && !this.prxModel.isNew
      && !this.prxModel.invalid(this.prxName)
      && this.prxModel.changed(this.prxName);
  }

  resetFieldOnCancel(confirm: boolean) {
    if (!confirm) {
      this.prxModel.set(this.prxName, this.prxModel.original[this.prxName]);
    }
  }
}
