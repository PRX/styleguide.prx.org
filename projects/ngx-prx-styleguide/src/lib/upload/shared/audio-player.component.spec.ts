//import { cit, create, provide, By } from '../../../testing';
import { Subject } from 'rxjs';
import { AudioPlayerComponent } from './audio-player.component';
import { PlayerService } from '../../audio';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

describe('AudioPlayerComponent', () => {

  let fix: ComponentFixture<AudioPlayerComponent>,
      el: DebugElement,
      comp: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PlayerService, useValue: {play: () => ({subscribe: () => null})}}
      ],
      declarations: [AudioPlayerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(AudioPlayerComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('shows errors', () => {
    const msg = 'Some error message'
    comp.error = msg;
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(msg));
  });

  it('plays a file', () => {
    jest.spyOn(comp.player, 'play');
    const file = 'some-file';
    comp.file = {upload: {file}};
    fix.detectChanges();
    expect(el.query(By.css('button.play'))).not.toBeNull();
    el.query(By.css('button.play')).nativeElement.click();
    fix.detectChanges();
    expect(el.query(By.css('button.pause'))).not.toBeNull();
    expect(comp.player.play).toHaveBeenCalledWith(file);
  });

  it('plays a url', () => {
    jest.spyOn(comp.player, 'play');
    const enclosureHref = 'some-href';
    comp.file = {enclosureHref};
    fix.detectChanges();
    expect(el.query(By.css('button.play'))).not.toBeNull();
    el.query(By.css('button.play')).nativeElement.click();
    fix.detectChanges();
    expect(el.query(By.css('button.pause'))).not.toBeNull();
    expect(comp.player.play).toHaveBeenCalledWith(enclosureHref);
  });

  it('shows progress', () => {
    let data = new Subject<any>();
    jest.spyOn(comp.player, 'play').mockImplementation(() => data);
    comp.file = {enclosureHref: 'some-href'};
    comp.play();
    expect(comp.progress).toEqual(0);
    expect(comp.loading).toEqual(true);
    expect(comp.playing).toEqual(false);
    data.next({duration: 10, progress: 5});
    expect(comp.progress).toEqual(0.5);
    expect(comp.loading).toEqual(false);
    expect(comp.playing).toEqual(true);
    data.complete();
    expect(comp.progress).toEqual(0);
    expect(comp.loading).toEqual(false);
    expect(comp.playing).toEqual(false);
  });

  it('stops playing', () => {
    comp.loading = true;
    comp.playing = true;
    comp.progress = 0.8;
    comp.stop();
    expect(comp.progress).toEqual(0);
    expect(comp.loading).toEqual(false);
    expect(comp.playing).toEqual(false);
  });

  it('proxies cms public asset urls', () => {
    jest.spyOn(comp.player, 'play');
    comp.file = {enclosureHref: 'http://cms-something/pub/some-href'};
    fix.detectChanges();
    el.query(By.css('button.play')).nativeElement.click();
    fix.detectChanges();
    expect(el.query(By.css('button.pause'))).not.toBeNull();
    expect(comp.player.play).toHaveBeenCalledWith(`${window.location.origin}/pub/some-href`);
  });
});
