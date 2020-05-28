import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { EpisodeCardComponent } from './episode-card.component';

const date = new Date();
const title = 'Best Episode Ever';
const seasonNumber = 1;
const episodeNumber = 5;
const teaser = 'Our very best episode';
const status = 'published';

@Component({
  selector: 'prx-test-component',
  template: `
    <prx-episode-card
      [date]="date"
      dateFormat="M/d"
      editLink="/story/1234"
      [title]="title"
      [seasonNumber]="seasonNumber"
      [episodeNumber]="episodeNumber"
      [teaser]="teaser"
      [status]="status"
    >
      <div>
        Something usually goes here
      </div>
    </prx-episode-card>
  `
})
class TestComponent {
  date: Date;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  teaser: string;
  status: string;
}

describe('EpisodeCardComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, EpisodeCardComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
      .then(() => {
        fix = TestBed.createComponent(TestComponent);
        comp = fix.componentInstance;
        de = fix.debugElement;
        el = de.nativeElement;

        comp.date = date;
        comp.title = title;
        comp.seasonNumber = seasonNumber;
        comp.episodeNumber = episodeNumber;
        comp.teaser = teaser;
        comp.status = status;
        fix.detectChanges();
      });
  }));

  it('renders the episode card', () => {
    expect(de.query(By.css('.story-date')).nativeElement.textContent).toContain(date.getDate());
    expect(de.query(By.css('h2')).nativeElement.textContent).toContain(title);
    expect(de.query(By.css('h3')).nativeElement.textContent).toContain(teaser);
  });

  it('projects inner content', () => {
    expect(de.nativeElement.textContent).toContain('Something usually goes here');
  });

  it('shows the title, otherwise season and episode number or drop date', () => {
    expect(de.query(By.css('h2')).nativeElement.textContent).toContain(title);
    comp.title = undefined;
    fix.detectChanges();
    expect(de.query(By.css('h2')).nativeElement.textContent).not.toContain(title);
    expect(de.query(By.css('h2')).nativeElement.textContent).toContain(`S${seasonNumber} E${episodeNumber}`);
    comp.seasonNumber = undefined;
    comp.episodeNumber = undefined;
    fix.detectChanges();
    expect(de.query(By.css('h2')).nativeElement.textContent).not.toContain(title);
    expect(de.query(By.css('h2')).nativeElement.textContent).not.toContain(`S${seasonNumber} E${episodeNumber}`);
    expect(de.query(By.css('h2')).nativeElement.textContent).toContain(date.getFullYear());
  });
});
