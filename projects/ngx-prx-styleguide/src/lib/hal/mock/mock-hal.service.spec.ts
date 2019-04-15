import { MockHalService } from './mock-hal.service';
import { patchObservable } from '../doc/halobservable';

describe('MockHalService', () => {

  let hal: MockHalService;
  beforeAll(() => patchObservable())
  beforeEach(() => hal = new MockHalService());

  it('makes public requests', () => {
    hal.mock('my:account', {id: 10});
    hal.public('foo', 'bar').follow('my:account').subscribe(doc => {
      expect(doc.id).toEqual(10);
    });
  });

  it('makes authorized requests', () => {
    hal.mockList('some:stuff', [{id: 4}, {id: 5}]);
    hal.authorized('foo', 'bar').followList('some:stuff').subscribe(docs => {
      expect(docs.length).toEqual(2);
      expect(docs[0].id).toEqual(4);
      expect(docs[1].id).toEqual(5);
    });
  });
});
