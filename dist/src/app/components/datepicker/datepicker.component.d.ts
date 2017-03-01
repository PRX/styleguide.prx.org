import { EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import * as Pikaday from 'pikaday';
export declare class DatepickerComponent implements AfterViewInit {
    static FORMAT: string;
    date: Date;
    dateChange: EventEmitter<Date>;
    input: ElementRef;
    picker: Pikaday;
    changed: boolean;
    readonly formattedDate: string;
    readonly invalid: boolean;
    setWhenValid(value: string): void;
    ngAfterViewInit(): void;
    setDate(date: Date): void;
}
