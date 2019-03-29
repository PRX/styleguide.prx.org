import { AbstractControl, Validator, NG_VALIDATORS, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import * as momentNs from 'moment';
import 'moment-timezone/moment-timezone';
const moment = momentNs;

@Directive({
  selector: '[prxTzTimestamp]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TzTimestampValidatorDirective, multi: true }]
})
export class TzTimestampValidatorDirective implements Validator {
  @Input('prxTzTimestamp') timestampFormat: string; // 12-hour (hh:mm:ss) or 24-hour (HH:mm:ss)
  validate(control: AbstractControl): ValidationErrors {
    return tzTimestampValidator(this.timestampFormat)(control);
  }
}

export function tzTimestampValidator(timestampFormat: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const timestampValid =
      moment(control.value, timestampFormat, true).isValid() ||
      moment(control.value, timestampFormat.match(/(h|H)+:mm/)[0], true).isValid();
    return timestampValid ? null : { tzTimestamp: true };
  };
}
