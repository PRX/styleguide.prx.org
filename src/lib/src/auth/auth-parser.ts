import { ElementRef } from '@angular/core';

export class AuthParser {

  static parseIframeQuery(el: ElementRef) {
    let iframe = el.nativeElement.getElementsByTagName('iframe')[0];
    return this.parseQuery(iframe.contentDocument.location.hash);
  }

  static parseQuery(locationHash: string) {
    return locationHash.replace(/^#/, '');
  }

  static parseToken(query = ''): string {
    let data = {};
    for (let pair of query.split('&')) {
      let parts = pair.split('=');
      data[parts[0]] = parts[1];
    }
    return data['access_token'] || data['error'];
  }

}
