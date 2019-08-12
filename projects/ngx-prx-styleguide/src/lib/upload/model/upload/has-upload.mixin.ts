import {of as observableOf, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { HalDoc } from '../../../hal/doc/haldoc';

/**
 * Define an uploadable field on a model
 *
 * (1) add "implements HasUpload" to the model
 * (2) add "hasUploadMap" to SETABLE
 * (3) add these mixin defs near the top of your class def:
 *       // HasUpload (and also in SETABLE)
 *       hasUploadMap: string;
 *       get getUploads() { return createGetUploads(); }
 *       get setUploads() { return createSetUploads(); }
 */
export abstract class HasUpload {

  // re-define BaseModel accessors this class needs
  abstract doc: HalDoc;
  abstract SETABLE: string[];
  abstract hasUploadMap: string;
  abstract set: (field: string, value: any) => void;
  abstract getUploads: (rel: string) => Observable<(HalDoc|string)[]>;
  abstract setUploads: (rel: string, uuids?: string[]) => void;

}

export function createGetUploads() {
  return function getUploads(rel: string): Observable<(HalDoc|string)[]> {
    if (this.SETABLE.indexOf('hasUploadMap') < 0) {
      this.SETABLE.push('hasUploadMap');
    }

    // parse the current uuids
    const uuidMap = this.hasUploadMap ? JSON.parse(this.hasUploadMap) : {};
    const uuids = <any[]> (uuidMap[rel] || []);

    // concat to stored docs
    if (this.doc && this.doc.has(rel)) {
      if (this.doc.has(rel, true)) {
        return this.doc.followList(rel).pipe(map((docs: HalDoc[]) => docs.concat(uuids)));
      } else {
        return this.doc.followItems(rel).pipe(map((docs: HalDoc[]) => docs.concat(uuids)));
      }
    } else {
      return observableOf(uuids);
    }
  };
}

export function createSetUploads() {
  return function setUploads(rel: string, uuids?: string[]) {
    if (this.SETABLE.indexOf('hasUploadMap') < 0) {
      this.SETABLE.push('hasUploadMap');
    }

    // parse current uuids and sort additions
    const uuidMap = this.hasUploadMap ? JSON.parse(this.hasUploadMap) : {};
    const ordered = (uuids || []).filter(u => u).sort();

    // unset 0-length uuids
    if (ordered && ordered.length) {
      uuidMap[rel] = ordered;
    } else {
      delete uuidMap[rel];
    }

    // unset empty maps
    if (Object.keys(uuidMap).length) {
      this.set('hasUploadMap', JSON.stringify(uuidMap));
    } else {
      this.set('hasUploadMap', undefined);
    }
  };
}
