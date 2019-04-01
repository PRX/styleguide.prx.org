import { Injectable } from '@angular/core';
import { TzDatepickerModule } from './tz-datepicker.module';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TzDataService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  fetchTzs() {
    return this.http.get<{ version: string; links: string[]; zones: string[] }>('/assets/data/timezones.json');
  }
}
