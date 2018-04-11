import { ElementRef } from '@angular/core';

export class AuthParser {

  static parseIframeQuery(el: ElementRef) {
    let iframe = el.nativeElement.getElementsByTagName('iframe')[0];
    return this.parseQuery(iframe.contentDocument.location.hash);
  }

  static parseQuery(locationHash: string) {
    return locationHash.replace(/^#/, '');
  }

  static queryToPairs(query = ''): {} {
    let data = {};
    for (let pair of query.split('&')) {
      let parts = pair.split('=');
      data[parts[0]] = parts[1];
    }
    return data;
  }

  static parseToken(query = ''): string {
    return this.queryToPairs(query)['access_token'];
  }

  static parseError(query = ''): string {
    return this.queryToPairs(query)['error'];
  }

}
