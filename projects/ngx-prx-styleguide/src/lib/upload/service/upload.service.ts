import { of as observableOf, from as observableFrom, Observable, ConnectableObservable, Subscriber } from 'rxjs';
import { publish, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as Evaporate from 'evaporate';
import * as sparkMD5 from 'spark-md5';
import { sha256 } from 'js-sha256';

import { UUID } from './uuid';
import { MimeTypeService } from './mime-type.service';

@Injectable()
export class UploadService {

  public uploads: Upload[] = [];

  private evaporate: Observable<Evaporate>;
  private bucketName: string;
  private bucketFolder: string;
  private bucketAccel: boolean;
  private signUrl: string;
  private awsKey: string;

  constructor(private mimeTypeService: MimeTypeService,
    {bucketName, bucketFolder, bucketAccel, signUrl, awsKey}) {
    this.bucketName = bucketName;
    this.bucketFolder = bucketFolder;
    this.bucketAccel = bucketAccel;
    this.signUrl = signUrl;
    this.awsKey = awsKey;
    this.evaporate = this.init();
  }

  init(): Observable<Evaporate> {
    // until there is a good way to load from env and inject
    return observableFrom(
      Evaporate.create({
        signerUrl: this.signUrl,
        aws_key: this.awsKey,
        bucket: this.bucketName,
        s3Acceleration: this.bucketAccel,
        onlyRetryForSameFileName: true,
        logging: false,
        awsSignatureVersion: '4',
        computeContentMd5: true,
        cryptoMd5Method: data => btoa(sparkMD5.ArrayBuffer.hash(data, true)),
        cryptoHexEncodedHash256: sha256,
      }).then(evaporate => evaporate)
    );
  }

  add(file: File, contentType?: string): Observable<Upload> {
    return this.evaporate.pipe(map(evaporate => {
      const ct = contentType || this.mimeTypeService.lookupFileMimetype(file).full();
      const upload = new Upload(file, ct, evaporate, {bucketFolder: this.bucketFolder, bucketName: this.bucketName});
      this.uploads.push(upload);
      return upload;
    }));
  }

  find(uuid: string): Upload {
    for (let upload of this.uploads) {
      if (upload.uuid === uuid) {
        return upload;
      }
    }
    return null;
  }

  validFileType(file: File, allowed: string[]) {
    const ct = this.mimeTypeService.lookupFileMimetype(file).minor();
    return allowed.indexOf(ct) > -1;
  }
}

export class Upload {
  public uuid: string;
  public name: string;
  public size: number;
  public path: string;
  public url: string;
  public s3url: string;

  public progress: ConnectableObservable<number>;
  public complete: boolean;

  private bucketFolder: string;
  private bucketName: string;

  constructor(
    public file: File,
    public contentType: string,
    private evaporate: Evaporate,
    {bucketFolder, bucketName}: {bucketFolder: string, bucketName: string}
  ) {
    this.bucketFolder = bucketFolder;
    this.bucketName = bucketName;
    this.uuid = UUID.UUID();
    this.name = file.name;
    this.size = file.size;
    this.path = [this.bucketFolder, this.uuid, this.sanitizedName()].join('/');
    this.url = '//s3.amazonaws.com/' + this.bucketName + '/' + this.path;
    this.s3url = 's3://' + this.bucketName + '/' + this.path;
    this.upload();
  }

  cancel() {
    if (this.evaporate && !this.complete && this.progress) {
      this.evaporate.cancel(this.bucketName + '/' + this.path);
    }
  }

  upload(): Observable<number> {
    if (this.complete) {
      return observableOf(null);
    }
    this.cancel();

    const uploadOptions = {
      file: this.file,
      name: this.path,
      contentType: this.contentType,
      xAmzHeadersAtInitiate: {
        'x-amz-acl': 'public-read'
      },
      notSignedHeadersAtInitiate: {
        'Content-Disposition': 'attachment; filename=' + this.sanitizedName()
      }
    };

    const progressObservable: Observable<number> = Observable.create((sub: Subscriber<number>) => {
      sub.next(0);
      uploadOptions['progress'] = (pct: number) => sub.next(pct);
      uploadOptions['complete'] = () => { sub.next(1.0); this.complete = true; sub.complete(); };
      uploadOptions['error']    = (msg: string) => sub.error(msg);
      this.evaporate.add(uploadOptions).catch(err => {
        if (err.indexOf('User aborted') === -1) {
          throw(err);
        }
      });
    });

    // share the underlying observable without creating dups
    this.progress = progressObservable.pipe(publish()) as ConnectableObservable<number>;
    this.progress.connect();
    return this.progress;
  }

  sanitizedName() {
    let res = this.name;
    res = res.normalize ? res.normalize('NFD') : res;

    return res
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\.]+/gi, '_');
  }
}
