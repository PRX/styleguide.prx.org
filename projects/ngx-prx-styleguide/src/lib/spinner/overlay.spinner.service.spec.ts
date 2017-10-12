import { Observable } from 'rxjs/Observable';
import { OverlaySpinnerService } from './overlay.spinner.service';

describe('OverlaySpinnerService', () => {

  it('shares a global overlay showing state', () => {
    let overlay = new OverlaySpinnerService();
    expect(overlay.showing instanceof Observable).toBeTruthy();
  });

  it('controls the overlay spinner showing state', () => {
    let shown = false;
    let overlay = new OverlaySpinnerService();
    overlay.showing.subscribe((shouldShow) => { shown = shouldShow; });

    overlay.show();
    expect(shown).toBe(true);
    overlay.hide();
    expect(shown).toBe(false);
  });

});
