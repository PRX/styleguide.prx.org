import { tzTimestampValidator } from './tz-timestamp-validator.directive';
import { AbstractControl } from '@angular/forms';

describe('TzTimestampValidatorDirective', () => {
  const twelveHourValidator = tzTimestampValidator('hh:mm:ss')
  const twentyFourHourValidator = tzTimestampValidator('HH:mm:ss')
  it(`Should validate good input`, () => {
    const invalidControl = {value:'12:59:59'} as AbstractControl
    expect(twelveHourValidator(invalidControl)).toBeFalsy()
    expect(twentyFourHourValidator(invalidControl)).toBeFalsy()
  });
  it(`Should validate good 24-hour input`, () => {
    const invalidControl = {value:'13:00:00'} as AbstractControl
    expect(twelveHourValidator(invalidControl)).toBeTruthy()
    expect(twentyFourHourValidator(invalidControl)).toBeFalsy()
  });
  it(`Should validate value without seconds`, () => {
    const invalidControl = {value:'13:00'} as AbstractControl
    expect(twelveHourValidator(invalidControl)).toBeTruthy()
    expect(twentyFourHourValidator(invalidControl)).toBeFalsy()
  });
  it(`Shouldn't validate bad input`, () => {
    const invalidControl = {value:'a'} as AbstractControl
    expect(twelveHourValidator(invalidControl)).toBeTruthy()
    expect(twentyFourHourValidator(invalidControl)).toBeTruthy()
  });
  it(`Shouldn't validate hours out of range`, () => {
    const invalidControl = {value:'25:00:00'} as AbstractControl
    expect(twelveHourValidator(invalidControl)).toBeTruthy()
    expect(twentyFourHourValidator(invalidControl)).toBeTruthy()
  });
  it(`Shouldn't validate minutes out of range`, () => {
    const invalidControl = {value:'22:60:00'} as AbstractControl
    expect(twelveHourValidator(invalidControl)).toBeTruthy()
    expect(twentyFourHourValidator(invalidControl)).toBeTruthy()
  });
  it(`Shouldn't validate seconds out of range`, () => {
    const invalidControl = {value:'22:00:60'} as AbstractControl
    expect(twelveHourValidator(invalidControl)).toBeTruthy()
    expect(twentyFourHourValidator(invalidControl)).toBeTruthy()
  });
});
