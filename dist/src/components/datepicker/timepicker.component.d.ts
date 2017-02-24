import { EventEmitter } from '@angular/core';
export declare class TimepickerComponent {
    date: Date;
    onTimeChange: EventEmitter<Date>;
    changed: boolean;
    localTimezone: string;
    options: string[];
    constructor();
    roundMinutes(value: number): string;
    convert24to12Hours(hours: number): number;
    amPm(hours: number): string;
    dateToHumanTime(date: Date): string;
    readonly time: string;
    set(value: string): void;
}
