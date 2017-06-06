import { MockHalDoc } from './mock-haldoc';

describe('MockHalDoc', () => {

  let doc: MockHalDoc;
  beforeEach(() => doc = new MockHalDoc({id: 123, foo: 'bar'}, 'model/whatever'));

  it('guesses profiles from a rel string', () => {
    expect(MockHalDoc.guessProfile('prx:story')).toEqual('model/story');
    expect(MockHalDoc.guessProfile('prx:stories', true)).toEqual('collection/story');
    expect(MockHalDoc.guessProfile('foo:bar')).toBeNull();
    expect(MockHalDoc.guessProfile('')).toBeNull();
  });

  it('assigns doc data', () => {
    expect(doc.id).toEqual(123);
    expect(doc['foo']).toEqual('bar');
    expect(doc.profile).toEqual('model/whatever');
  });

  it('mocks a relative', () => {
    doc.mock('prx:thing', {id: 456, hello: 'world'});
    doc.follow('prx:thing').subscribe(thing => {
      expect(thing.id).toEqual(456);
      expect(thing['hello']).toEqual('world');
    });
  });

  it('mocks a list', () => {
    doc.mockList('prx:things', [{id: 12}, {id: 34}, {id: 56}]);
    doc.followList('prx:things').subscribe(things => {
      expect(things.length).toEqual(3);
      expect(things[0].id).toEqual(12);
      expect(things[1].id).toEqual(34);
      expect(things[2].id).toEqual(56);
    });
  });

  it('mocks prx items', () => {
    doc.mockItems('prx:things', [{id: 12}, {id: 34}]);
    doc.followItems('prx:things').subscribe(things => {
      expect(things.length).toEqual(2);
      expect(things[0].id).toEqual(12);
      expect(things[1].id).toEqual(34);
    });
  });

  it('mocks errors', () => {
    doc.mockError('foo:bar', 'something what who');
    doc.followItems('foo:bar').subscribe(
      () => { throw new Error('should have gotten error'); },
      err => {
        expect(err.message).toEqual('something what who');
      }
    );
  });

  it('throws errors for unmocked requests', () => {
    doc.follow('foo:bar').subscribe(
      () => { throw new Error('should have gotten error'); },
      err => {
        expect(err.message).toMatch(/un-mocked request for rel foo:bar/i);
      }
    );
  });

  it('pretends to update', () => {
    doc.update({foo: 'two'}).subscribe();
    expect(doc['foo']).toEqual('two');
  });

  it('pretends to create', () => {
    doc.create('prx:created-thing', {}, {id: 789});
    doc.follow('prx:created-thing').subscribe(thing => {
      expect(thing.id).toEqual(789);
    });
  });

  it('pretends to destroy', () => {
    doc.destroy().subscribe();
    expect(doc['_destroyed']).toEqual(true);
  });

  it('counts and totals', () => {
    doc['_count'] = 5;
    doc['_total'] = 10;
    doc.mockList('things', [{}, {}, {}]);
    expect(doc.count('things')).toEqual(3);
    expect(doc.count()).toEqual(5);
    expect(doc.total()).toEqual(10);
  });

  it('has links', () => {
    doc.mock('thing', {});
    expect(doc.has('thing')).toEqual(true);
    expect(doc.has('thing', true)).toEqual(false);
    expect(doc.has('bla')).toEqual(false);
  });

  it('isa profile type', () => {
    expect(doc.isa('whatever')).toEqual(true);
    expect(doc.isa('thing')).toEqual(false);
    doc.profile = 'collection/whatever';
    expect(doc.isa('whatever', false)).toEqual(false);
    expect(doc.isa('whatever', true)).toEqual(true);
  });

  it('expands links but not quite how you think', () => {
    doc.mock('thing', {href: '/foo/bar'});
    expect(doc.expand('thing')).toEqual('/foo/bar');
    doc['_links'] = {thing2: [{href: '/other/thing'}]};
    expect(doc.expand('thing2')).toEqual('/other/thing');
  });

});
