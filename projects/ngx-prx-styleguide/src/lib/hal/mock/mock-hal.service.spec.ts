import { MockHalService } from './mock-hal.service';

describe('MockHalService', () => {

  let hal: MockHalService;
  beforeEach(() => hal = new MockHalService());

  it('makes public requests', () => {
    hal.mock('my:account', {id: 10});
    hal.public('some.host', 'my:account').subscribe(doc => {
      expect(doc.id).toEqual(10);
    });
  });

  it('makes authorized requests', () => {
    hal.mock('some:authorized', {id: 4});
    hal.authorized('some.host', 'some:authorized').subscribe(doc => {
      expect(doc.id).toEqual(4);
    });
  });

});
