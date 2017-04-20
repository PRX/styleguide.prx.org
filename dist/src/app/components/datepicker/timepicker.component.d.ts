import { EventEmitter, OnChanges } from '@angular/core';
export declare class TimepickerComponent implements OnChanges {
    date: Date;
    timeChange: EventEmitter<Date>;
    changed: boolean;
    localTimezone: string;
    options: string[];
    ngOnChanges(): void;
    roundMinutes(value: number): string;
    convert24to12Hours(hours: number): number;
    amPm(hours: number): string;
    dateToHumanTime(date: Date): string;
    readonly time: string;
    set(value: string): void;
}
