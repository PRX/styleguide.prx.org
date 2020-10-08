import { of as observableOf } from 'rxjs';
import { AudioInputComponent } from './audio-input.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { DebugElement } from '@angular/core';
import { UploadService } from '../service/upload.service';
import { PlayerService } from '../../audio';
import { By } from '@angular/platform-browser';

describe('AudioInputComponent', () => {
  let fix: ComponentFixture<AudioInputComponent>, el: DebugElement, comp: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UploadService, useValue: { add: () => observableOf(null) } },
        { provide: PlayerService, useValue: { checkFile: () => observableOf({}) } }
      ],
      declarations: [AudioInputComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fix = TestBed.createComponent(AudioInputComponent);
        el = fix.debugElement;
        comp = el.componentInstance;
      });
  }));

  const makeVersion = () => {
    let version = {
      file: null,
      addUpload: () => {
        version.file = { set: (k, v) => (version.file[k] = v) };
        return version.file;
      }
    };
    return version;
  };

  let durationSpy;
  const setDuration = (comp, milliseconds) => {
    if (!durationSpy) {
      comp.version = makeVersion();
      durationSpy = jest.spyOn(comp.player, 'checkFile');
    }
    let data = { format: 'fm', duration: milliseconds, bitrate: 'br', frequency: 'fr' };
    durationSpy.mockImplementation(() => observableOf(data));
    comp.addFile(<any>'some-file');
    return comp.version.file.duration;
  };

  it('checks uploaded files', () => {
    jest.spyOn(comp.player, 'checkFile').mockImplementation(() => ({ subscribe: () => null }));
    comp.addFile(<any>'some-file');
    expect(comp.player.checkFile).toHaveBeenCalledWith('some-file');
  });

  it('uploads files', () => {
    comp.version = makeVersion();
    jest.spyOn(comp.uploadService, 'add');
    comp.addFile(<any>'some-file');
    expect(comp.uploadService.add).toHaveBeenCalledWith('some-file');
  });

  it('sets audio file fields', () => {
    comp.version = makeVersion();
    let data = { format: 'fm', duration: 5501, bitrate: 'br', frequency: 'fr' };
    jest.spyOn(comp.player, 'checkFile').mockImplementation(() => observableOf(data));
    comp.addFile(<any>'some-file');
    expect(comp.version.file.format).toEqual('fm');
    expect(comp.version.file.duration).toEqual(6);
    expect(comp.version.file.bitrate).toEqual('br');
    expect(comp.version.file.frequency).toEqual('fr');
  });

  it('rounds durations', () => {
    expect(setDuration(comp, null)).toBeNull();
    expect(setDuration(comp, undefined)).toBeNull();
    expect(setDuration(comp, 0)).toEqual(0);
    expect(setDuration(comp, 123)).toEqual(1);
    expect(setDuration(comp, 1200)).toEqual(1);
    expect(setDuration(comp, 1800)).toEqual(2);
  });

  it('uploads single', () => {
    comp.multiple = false;
    fix.detectChanges();
    expect(el.query(By.css('input')).nativeElement.getAttribute('multiple')).toBe('false');
  });

  it('uploads multiple', () => {
    comp.multiple = true;
    fix.detectChanges();
    expect(el.query(By.css('input')).nativeElement.getAttribute('multiple')).toBe('true');
  });

  it('accepts different content types', () => {
    comp.accept = undefined;
    expect(comp.acceptWildcard).toEqual('*');
    comp.accept = 'audio/mpeg';
    expect(comp.acceptWildcard).toEqual('audio/*');
    comp.accept = 'audio/foobar';
    expect(comp.acceptWildcard).toEqual('audio/*');
    comp.accept = 'video/mpeg';
    expect(comp.acceptWildcard).toEqual('video/*');
    comp.accept = 'foo/bar';
    expect(comp.acceptWildcard).toEqual('*');
  });
});
