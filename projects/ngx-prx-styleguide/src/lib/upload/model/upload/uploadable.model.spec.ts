import { of as observableOf, EMPTY as observableEmpty, throwError as observableThrowError, Observable } from 'rxjs';
import { ConnectableObservable } from 'rxjs';
import { Subscriber } from 'rxjs';
import { UploadableModel } from './uploadable.model';
import { Upload } from '../../service/upload.service';
import { MockHalService } from '../../../hal/mock/mock-hal.service';

const cms = new MockHalService();

class TestUploadableModel extends UploadableModel {
  SETABLE = ['foobar'];
  VALIDATORS = { foobar: <any[]>[] };
  stateComplete(status) {
    return status === 'complete';
  }
  stateError(status) {
    return status === 'errored' ? 'the error message' : null;
  }
  key() {
    return 'foo';
  }
  related() {
    return {};
  }
  saveNew() {
    return observableOf(null);
  }
}

describe('UploadableModel', () => {
  let model: TestUploadableModel;
  let upload: Upload;
  beforeEach(() => {
    window.localStorage.clear();
    model = new TestUploadableModel();
    jest.spyOn(Upload.prototype, 'upload').mockImplementation(jest.fn());
    upload = new Upload(<any>{ name: 'name.mp3', size: 99 }, null, null, { bucketFolder: 'foo', bucketName: 'bar' });
    upload['progress'] = <ConnectableObservable<number>>observableOf(0.12);
  });

  describe('initUpload', () => {
    it('enhances the setable fields', () => {
      model.initUpload();
      expect(model.SETABLE).toContain('foobar');
      expect(model.SETABLE).toContain('filename');
      expect(model.SETABLE).toContain('uuid');
    });

    it('enhances the field validations', () => {
      model.initUpload();
      expect(Object.keys(model.VALIDATORS)).toContain('foobar');
      expect(Object.keys(model.VALIDATORS)).toContain('isUploading');
    });

    it('sets the uuid for uploads', () => {
      model.initUpload(null, <any>{});
      expect(model.uuid).toBeNull();
      model.initUpload(null, '9876');
      expect(model.uuid).toEqual('9876');
      upload.uuid = '1234';
      model.initUpload(null, upload);
      expect(model.uuid).toEqual('1234');
    });

    it('initializes with existing haldocs', () => {
      jest.spyOn(model, 'init').mockImplementation(jest.fn());
      jest.spyOn(model, 'setState').mockImplementation(jest.fn());
      jest.spyOn(model, 'watchProcess').mockImplementation(jest.fn());
      let doc = cms.mock('prx:anything', { id: 1234 });
      model.initUpload(<any>'anything', doc);
      expect(model.init).toHaveBeenCalledWith('anything', doc);
      expect(model.setState).toHaveBeenCalled();
      expect(model.watchProcess).not.toHaveBeenCalled();
    });

    it('watches processing for incomplete uploads', () => {
      jest.spyOn(model, 'init').mockImplementation(jest.fn());
      jest.spyOn(model, 'setState').mockImplementation(jest.fn());
      jest.spyOn(model, 'watchProcess').mockImplementation(jest.fn());
      let doc = cms.mock('prx:anything', { id: 1234 });
      model.isProcessing = true;
      model.initUpload(<any>'anything', doc);
      expect(model.init).toHaveBeenCalledWith('anything', doc);
      expect(model.setState).toHaveBeenCalled();
      expect(model.watchProcess).toHaveBeenCalled();
    });

    it('sets the upload properties', () => {
      jest.spyOn(model, 'watchUpload').mockImplementation(jest.fn());
      model.initUpload(null, '1234');
      expect(model.watchUpload).not.toHaveBeenCalled();
      model.initUpload(null, upload);
      expect(model.watchUpload).toHaveBeenCalledWith(upload);
      expect(model.filename).toEqual('name.mp3');
      expect(model.size).toEqual(99);
    });

    it('does not watch completed uploads', () => {
      jest.spyOn(model, 'watchUpload').mockImplementation(jest.fn());
      upload.complete = true;
      model.initUpload(null, upload);
      expect(model.watchUpload).not.toHaveBeenCalled();
    });
  });

  describe('watchUpload', () => {
    it('starts an upload from the beginning', () => {
      model.watchUpload(<any>{ progress: observableEmpty });
      expect(model.progress).toEqual(0);
      expect(model.isUploading).toEqual(true);
      expect(model.isUploadError).toBeNull();
    });

    it('watches for progress', () => {
      let progress: Subscriber<number>;
      model.watchUpload(<any>{
        progress: Observable.create((obs: any) => {
          progress = obs;
        })
      });
      expect(model.progress).toEqual(0);
      progress.next(0.41);
      expect(model.progress).toEqual(0.41);
    });

    it('catches upload errors', () => {
      jest.spyOn(console, 'error').mockImplementation(jest.fn());
      model.watchUpload(<any>{ progress: observableThrowError('woh now') });
      expect(model.progress).toEqual(0);
      expect(model.isUploading).toEqual(true);
      expect(model.isUploadError).toEqual('woh now');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('setState', () => {
    it('shows completed', () => {
      model.status = 'complete';
      model.setState();
      expect(model.isCompleted).toEqual(true);
      expect(model.isProcessError).toEqual(null);
      expect(model.isProcessing).toEqual(false);
    });

    it('shows errors', () => {
      model.status = 'errored';
      model.setState();
      expect(model.isCompleted).toEqual(false);
      expect(model.isProcessError).toEqual('the error message');
      expect(model.isProcessing).toEqual(false);
      model.isProcessTimeout = true;
      model.setState();
      expect(model.isCompleted).toEqual(false);
      expect(model.isProcessError).toEqual('Timed out waiting for processing');
      expect(model.isProcessing).toEqual(false);
    });

    it('shows processing', () => {
      model.status = 'whatever';
      model.setState();
      expect(model.isCompleted).toEqual(false);
      expect(model.isProcessError).toEqual(null);
      expect(model.isProcessing).toEqual(true);
    });
  });

  describe('watchProcess', () => {
    let doc: any, status: string;
    beforeEach(() => {
      status = 'whatev';
      let reload = () => {
        doc['status'] = status;
        return observableOf(doc);
      };
      doc = cms.mock('doc', { reload: reload });
      model.UPLOAD_PROCESS_INTERVAL = 1;
    });

    it('waits for completion', function(done) {
      status = 'complete';
      model.initUpload(<any>'anything', doc);
      expect(model.isCompleted).toEqual(false);
      setTimeout(() => {
        expect(model.isCompleted).toEqual(true);
        done();
      }, 10);
    });

    it('times out', function(done) {
      model.initUpload(<any>'anything', doc);
      expect(model.isProcessTimeout).toBeFalsy();
      let theFuture = new Date('2099-01-01');
      jest.spyOn(<any>window, 'Date').mockImplementation(() => theFuture);
      setTimeout(() => {
        expect(model.isProcessTimeout).toEqual(true);
        done();
      }, 10);
    });
  });

  it('retries uploads', () => {
    model.initUpload(null, upload);
    model.isUploading = false;
    model.isUploadError = 'yep';
    model.progress = 0.5;
    model.retryUpload();
    expect(model.progress).toEqual(0.12);
    expect(model.isUploading).toEqual(true);
    expect(model.isUploadError).toBeNull();
  });

  it('retries processing', () => {
    let doc = cms.mock('prx:anything', { id: 1234, status: 'uploaded' });
    jest.spyOn(<any>doc, 'update').mockImplementation(() => ({ subscribe: fn => fn() }));
    jest.spyOn(model, 'watchProcess').mockImplementation(jest.fn());
    model.initUpload(<any>'anything', doc);
    model.retryProcessing();
    expect(doc.update).toHaveBeenCalled();
    expect(model.watchProcess).toHaveBeenCalled();
  });

  it('decodes remote attributes', () => {
    model.doc = cms.mock('anything', {
      filename: 'hello',
      size: 999,
      _links: { enclosure: { href: '/some/link/here' } }
    });
    model.decode();
    expect(model.filename).toEqual('hello');
    expect(model.size).toEqual(999);
    expect(model.enclosureHref).toMatch('/some/link/here');
  });

  describe('encode', () => {
    it('returns only saveable attributes', () => {
      model.isNew = true;
      let keys = Object.keys(model.encode());
      expect(keys).toContain('upload');
      expect(keys).not.toContain('status');
      expect(keys).not.toContain('progress');
    });

    it('only returns the upload file for new audio', () => {
      model.isNew = false;
      let keys = Object.keys(model.encode());
      expect(keys).not.toContain('filename');
      expect(keys).not.toContain('size');
      expect(keys).not.toContain('upload');
    });
  });

  it('cancels uploads when destroyed', () => {
    jest.spyOn(model, 'unsubscribe').mockImplementation(jest.fn());
    jest.spyOn(upload, 'cancel').mockImplementation(() => observableOf(false));
    model.initUpload(null, upload);
    model.destroy();
    expect(model.unsubscribe).toHaveBeenCalled();
    expect(upload.cancel).toHaveBeenCalled();
  });
});
