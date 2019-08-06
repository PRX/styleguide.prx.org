import { ElementRef } from '@angular/core';

export class AuthParser {

  static parseIframeQuery(el: ElementRef) {
    const iframe = el.nativeElement.getElementsByTagName('iframe')[0];
    return this.parseQuery(iframe.contentDocument.location.hash);
  }

  static parseQuery(locationHash: string) {
    return locationHash.replace(new RegExp('^#'), '');
  }

  static queryToPairs(query = ''): {} {
    const data = {};
    for (const pair of query.split('&')) {
      const parts = pair.split('=');
      data[parts[0]] = parts[1];
    }
    return data;
  }

  static parseToken(query = ''): string {
    return AuthParser.queryToPairs(query)['access_token'];
  }

  static parseError(query = ''): string {
    return AuthParser.queryToPairs(query)['error'];
  }

}
