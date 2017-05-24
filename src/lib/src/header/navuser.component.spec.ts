import { cit, cms, contain, findComponent } from '../../../testing';
import { NavUserComponent } from './navuser.component';

describe('NavUserComponent', () => {

  contain(NavUserComponent, {
    template: `
      <publish-navuser>
        <h1 class="user-loading">IsLoading</h1>
        <h1 class="user-loaded">IsLoaded</h1>
      </publish-navuser>
    `
  });

  beforeEach(() => {
    let auth = cms.mock('prx:authorization', {});
    auth.mockItems('prx:accounts', [
      {name: 'TheAccountName', type: 'IndividualAccount'},
      {name: 'DefaultName', type: 'DefaultAccount'}
    ]);
  });

  cit('displays the account name', (fix, el, comp) => {
    expect(el).toQueryText('.name', 'TheAccountName');
    expect(findComponent(el, 'publish-navuser').userName).toEqual('TheAccountName');
  });

  cit('displays the loaded content', (fix, el, comp) => {
    expect(el).toContainText('IsLoaded');
  });

  cit('displays loading content', (fix, el, comp) => {
    findComponent(el, 'publish-navuser').userName = null;
    fix.detectChanges();
    expect(el).not.toContainText('TheAccountName');
    expect(el).toContainText('IsLoading');
  });

});
