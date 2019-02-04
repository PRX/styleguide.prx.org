
import {of as observableOf, empty as observableEmpty,  Observable ,  Observer } from 'rxjs';


import { BaseModel } from './base.model';
import { MockHalDoc } from '../hal/mock/mock-haldoc';

class FakeModel extends BaseModel {
  someattribute = 'somevalue';
  key() { return 'key'; }
  related() { return {}; }
  decode() { for (let k of Object.keys(this.doc)) { this[k] = this.doc[k]; } }
  encode() { return {}; }
  saveNew(data: {}) { return <any> null; }
}

describe('BaseModel', () => {

  let base: FakeModel;
  beforeEach(() => {
    base = new FakeModel();
    if (window && window.localStorage) {
      window.localStorage.clear();
    }
  });

  describe('init', () => {

    it('sets the parent-self relationship', () => {
      spyOn(base, 'decode').and.stub();
      const fakeParent = new MockHalDoc({id: 123, foo: 'bar'}, 'model/whatever')
      const fakeSelf = new MockHalDoc({id: 123, foo: 'bar'}, 'model/whatever')
      base.init(fakeParent, fakeSelf);
      expect(base.isNew).toEqual(false);
      expect(base.parent).toEqual(fakeParent);
      expect(base.doc).toEqual(fakeSelf);
      expect(base.decode).toHaveBeenCalled();
    });

    it('only decodes existing documents', () => {
      spyOn(base, 'decode').and.stub();
      base.init();
      expect(base.isNew).toEqual(true);
      expect(base.decode).not.toHaveBeenCalled();
    });

    it('records original values', () => {
      base.SETABLE = ['foo', 'bar'];
      base.init(null, <any> {foo: 'fooval', hello: 'world'});
      expect(base.original).toEqual({foo: 'fooval', bar: undefined});
    });

    it('overlays stored values', () => {
      base.SETABLE = ['someattribute'];
      spyOn(base, 'restore').and.callFake(function() { this.someattribute = 'override'; });
      base.init(null, <any> {someattribute: 'originalvalue'});
      expect(base.someattribute).toEqual('override');
      expect(base.original['someattribute']).toEqual('originalvalue');
    });

    it('subscribes to related models', () => {
      spyOn(base, 'related').and.callFake(() => {
        return {foo: observableOf('bar')};
      });
      base.init(null, null, false);
      expect(base.RELATIONS).toEqual(['foo']);
      expect(base['foo']).toBeUndefined();

      base.init();
      expect(base.RELATIONS).toEqual(['foo']);
      expect(base['foo']).toEqual('bar');
    });

  });

  describe('set', () => {

    it('sets and stores the value', () => {
      base.SETABLE = ['foo'];
      spyOn(base, 'store').and.stub();
      base.set('foo', 'bar');
      expect(base.store).toHaveBeenCalled();
    });

    it('force updates the original value', () => {
      base.SETABLE = ['someattribute'];
      expect(base.original['someattribute']).toBeUndefined();

      base.set('someattribute', 'foo');
      expect(base.someattribute).toEqual('foo');
      expect(base.original['someattribute']).toBeUndefined();

      base.set('someattribute', 'bar', true);
      expect(base.someattribute).toEqual('bar');
      expect(base.original['someattribute']).toEqual('bar');
    });

  });

  describe('loadRelated', () => {

    beforeEach(() => {
      let fooCount = 1, barCount = 1;
      let foo = Observable.create((sub: Observer<number>) => sub.next(fooCount++));
      let bar = Observable.create((sub: Observer<number>) => sub.next(barCount++));
      spyOn(base, 'related').and.callFake(() => { return {foo: foo, bar: bar}; });
      base.init(null, null, false);
    });

    it('loads all relations', () => {
      let done = false;
      base.loadRelated().subscribe(() => done = true);
      expect(done).toEqual(true);
      expect(base['foo']).toEqual(1);
      expect(base['bar']).toEqual(1);
    });

    it('loads a single relation', () => {
      let val = null;
      base.loadRelated('foo').subscribe(v => val = v);
      expect(val).toEqual(1);
      expect(base['foo']).toEqual(1);
      expect(base['bar']).toBeUndefined();
    });

    it('replays relations', () => {
      base.loadRelated('foo').subscribe(() => null);
      base.loadRelated('foo').subscribe(() => null);
      base.loadRelated('foo').subscribe(() => null);
      expect(base['foo']).toEqual(1);
    });

    it('forces reloading a relation', () => {
      base.loadRelated('foo').subscribe(() => null);
      base.loadRelated('foo', true).subscribe(() => null);
      expect(base['foo']).toEqual(2);
    });

  });

  describe('save', () => {

    it('ignores the call for new-but-deleted docs', () => {
      let called = false;
      base.isDestroy = true;
      base.save().subscribe((done) => {
        called = true;
        expect(base.isSaving).toBeFalsy();
        expect(done).toEqual(false);
      });
      expect(called).toBeTruthy();
    });

    it('calls to the child class for new docs', () => {
      spyOn(base, 'saveNew').and.returnValue(observableEmpty());
      base.isNew = true;
      base.save();
      expect(base.saveNew).toHaveBeenCalled();
    });

    it('updates existing docs', () => {
      base.doc = <any> {update: null};
      base.changed = () => false;
      spyOn(base.doc, 'update').and.returnValue(observableEmpty());
      base.save();
      expect(base.doc.update).not.toHaveBeenCalled();
      base.changed = () => true;
      base.save();
      expect(base.doc.update).toHaveBeenCalled();
    });

    it('deletes destroyed docs', () => {
      base.doc = <any> {destroy: null};
      spyOn(base.doc, 'destroy').and.returnValue(observableEmpty());
      base.isDestroy = true;
      base.save();
      expect(base.doc.destroy).toHaveBeenCalled();
    });

    it('re-inits after saving', () => {
      base.doc = <any> {update: null};
      base.changed = () => true;
      spyOn(base.doc, 'update').and.returnValue(observableOf({foo: 'bar'}));
      spyOn(base, 'unstore').and.stub();
      spyOn(base, 'init').and.callFake((parent: any, doc: any) => {
        expect(doc.foo).toEqual('bar');
      });
      base.save().subscribe();
      expect(base.doc.update).toHaveBeenCalled();
      expect(base.unstore).toHaveBeenCalled();
      expect(base.init).toHaveBeenCalled();
    });

    it('cascades saving to changed child models', () => {
      base.doc = <any> {update: null};
      spyOn(base.doc, 'update').and.returnValue(observableOf({foo: 'bar'}));
      spyOn(base, 'init').and.stub();

      let firstSaved = false, secondSaved = false;
      base.RELATIONS = ['foo'];
      base['foo'] = [
        {changed: () => true, save: () => { firstSaved = true; return observableOf(true); }},
        {changed: () => false, save: () => { secondSaved = true; return observableOf(true); }}
      ];
      base.save().subscribe();
      expect(firstSaved).toEqual(true);
      expect(secondSaved).toEqual(false);
    });

    it('swaps new child models', () => {
      let originalSaved = false, originalUnstore = false, swapCalled = null;
      let swapSaved = false, swapUnstore = false;
      let fakeFoo = {
        name: 'original',
        isNew: true,
        changed: () => true,
        swapNew: (data: any) => swapCalled = data,
        save: () => { originalSaved = true; return observableOf(true); },
        unstore: () => originalUnstore = true
      };
      spyOn(base, 'related').and.callFake(() => {
        return {foo: Observable.create((sub: Observer<any>) => sub.next([fakeFoo]))};
      });

      // init related
      base.init(null, <any> {update: () => observableOf({})});
      expect(base.RELATIONS).toEqual(['foo']);
      expect(base['foo'][0].name).toEqual('original');

      // change underlying related() and save
      fakeFoo = {
        name: 'swapped',
        isNew: false,
        changed: () => true,
        swapNew: () => true,
        save: () => { swapSaved = true; return observableOf(true); },
        unstore: () => swapUnstore = true
      };
      base.save().subscribe();

      // should have been swapped before original was saved
      expect(originalSaved).toEqual(false);
      expect(originalUnstore).toEqual(true);
      expect(swapCalled).not.toBeNull();
      if (swapCalled) {
        expect(swapCalled['name']).toEqual('swapped');
      }
      expect(swapSaved).toEqual(true);
      expect(swapUnstore).toEqual(false);
      expect(base['foo'][0].name).toEqual('swapped');
    });

    it('does not swap existing models', () => {
      let originalSaved = false;
      let fakeFoo = {
        isNew: false,
        changed: () => true,
        swapNew: () => { throw new Error('should not have swapped'); },
        save: () => { originalSaved = true; return observableOf(true); }
      };
      spyOn(base, 'related').and.callFake(() => {
        return {foo: Observable.create((sub: Observer<any>) => sub.next([fakeFoo]))};
      });

      // init related and save
      base.init(null, <any> {update: () => observableOf({})});
      base.save().subscribe();
      expect(originalSaved).toEqual(true);
    });

    it('removes destroyed child models', () => {
      base.doc = <any> {update: null};
      spyOn(base.doc, 'update').and.returnValue(observableOf({foo: 'bar'}));
      spyOn(base, 'init').and.stub();
      base.RELATIONS = ['foo'];
      base['foo'] = [{changed: () => true, save: () => observableOf(true), isDestroy: true}];
      base.save().subscribe();
      expect(base['foo'].length).toEqual(0);
    });

  });

  describe('changed', () => {

    it('only tracks changes for setable fields', () => {
      base.SETABLE = [];
      base.set('someattribute', 'foo');
      expect(base.someattribute).toEqual('foo');
      expect(base.changed('someattribute')).toEqual(false);
      base.SETABLE = ['someattribute'];
      base.set('someattribute', 'foo');
      expect(base.changed('someattribute')).toEqual(true);
    });

    it('checks specific or all fields', () => {
      base.SETABLE = ['one', 'two', 'four'];
      base.original = {one: '1', three: '3', four: '4'};
      base.set('one', 'new');
      base.set('two', 'new');
      base.set('three', 'new');
      base.set('four', '4');
      expect(base.changed('one')).toBeTruthy();
      expect(base.changed('two')).toBeTruthy();
      expect(base.changed('three')).toBeFalsy();
      expect(base.changed('four')).toBeFalsy();
      expect(base.changed()).toBeTruthy();
    });

    it('can compare array fields', () => {
      base.SETABLE = ['one'];
      base.original = {one: ['foo', 'bar']};
      base.set('one', ['foo']);
      expect(base.changed('one')).toBeTruthy();
      base.set('one', ['foo', 'bar']);
      expect(base.changed('one')).toBeFalsy();
    });

    it('cascades to child relations', () => {
      base.RELATIONS = ['foo'];
      expect(base.changed('foo')).toBeFalsy();
      expect(base.changed()).toBeFalsy();
      base['foo'] = [
        {changed: () => true},
        {changed: () => false}
      ];
      expect(base.changed('foo')).toBeTruthy();
      expect(base.changed()).toBeTruthy();
    });

    it('optionally ignores relations', () => {
      base.RELATIONS = ['foo'];
      base['foo'] = [{changed: () => true}];
      expect(base.changed()).toBeTruthy();
      expect(base.changed(null, false)).toBeFalsy();
    });

    it('counts existing destroys as changed', () => {
      expect(base.changed()).toBeFalsy();
      base.isDestroy = true;
      expect(base.changed()).toBeTruthy();
      expect(base.changed('foo')).toBeTruthy();
    });

    it('counts new destroys as unchanged', () => {
      expect(base.changed()).toBeFalsy();
      base.isDestroy = true;
      base.isNew = true;
      expect(base.changed()).toBeFalsy();
      expect(base.changed('foo')).toBeFalsy();
    });

  });

  describe('invalid', () => {

    it('only validates setable fields', () => {
      base.SETABLE = [];
      base.VALIDATORS = {someattribute: [() => 'bad']};
      base.set('someattribute', 'foo');
      expect(base.invalid('someattribute')).toBeNull();
      base.SETABLE = ['someattribute'];
      base.set('someattribute', 'foo');
      expect(base.invalid('someattribute')).toEqual('bad');
    });

    it('checks specific or all fields', () => {
      base.SETABLE = ['one', 'two', 'four'];
      base.VALIDATORS = {
        one: [() => null, () => 'bad', () => 'worst' ],
        two: [],
        three: [() => 'bad'],
        four: [() => null, () => null]
      };
      base.set('one', 'anything');
      base.set('two', 'anything');
      base.set('three', 'anything');
      base.set('four', 'anything');
      expect(base.invalid('one')).toEqual('bad');
      expect(base.invalid('two')).toBeNull();
      expect(base.invalid('three')).toBeNull();
      expect(base.invalid('four')).toBeNull();
      expect(base.invalid()).toEqual('bad');
    });

    it('cascades to child relations', () => {
      base.RELATIONS = ['foo'];
      expect(base.invalid('foo')).toBeNull();
      expect(base.invalid()).toBeNull();
      base['foo'] = [
        {invalid: () => 'yeah sure'},
        {invalid: () => <any> null}
      ];
      expect(base.invalid('foo')).toEqual('yeah sure');
      expect(base.invalid()).toEqual('yeah sure');
    });

    it('doesnt care about invalid for destroyed models', () => {
      base.SETABLE = ['one'];
      base.VALIDATORS = {one: [() => 'bad']};
      base.set('one', 'anything');
      expect(base.invalid('one')).toEqual('bad');
      expect(base.invalid()).toBeTruthy();
      base.isDestroy = true;
      expect(base.invalid('one')).toBeNull();
      expect(base.invalid()).toBeNull();
    });

    it('strictly enforces validations', () => {
      base.SETABLE = ['one'];
      base.VALIDATORS = {one: [(k, v, strict) => strict ? 'bad' : null]};
      base.set('one', 'anything');
      expect(base.invalid('one')).toEqual('bad');
      expect(base.invalid('one', true)).toEqual('bad');
      expect(base.invalid('one', false)).toBeNull();
    });

  });

  describe('storage', () => {

    it('round trips changed model data', () => {
      let theKey = 'some-storage-key';
      spyOn(base, 'key').and.callFake(() => theKey);

      // not persisted
      base.SETABLE = ['someattribute'];
      base.set('someattribute', 'start', true);
      expect(Object.keys(localStorage).length).toEqual(0);

      // changed fields persisted
      base.set('someattribute', 'new');
      expect(Object.keys(localStorage).length).toEqual(1);

      // overwrites
      base.someattribute = 'newer yet';
      base.restore();
      expect(base.someattribute).toEqual('new');

      // clears when not changed
      base.set('someattribute', 'start');
      expect(Object.keys(localStorage).length).toEqual(0);
    });

  });

  describe('discard', () => {

    it('discards changes and re-inits', () => {
      base.SETABLE = ['someattribute'];
      base.init();
      base.isDestroy = true;
      base.lastStored = new Date();
      base.someattribute = 'different value';
      base.discard();
      expect(base.isDestroy).toEqual(false);
      expect(base.lastStored).toBeNull();
      expect(base.someattribute).toEqual('somevalue');
    });

    it('discards child models and removes new records', () => {
      spyOn(base, 'related').and.callFake(() => {
        return {foo: observableOf('bar')};
      });
      base['foo'] = [
        {id: 1, isNew: true, discard: () => true},
        {id: 2, isNew: true, discard: () => false},
        {id: 3, isNew: false, discard: () => true}
      ];
      base.discard();
      expect(base['foo'].length).toEqual(2);
      expect(base['foo'][0].id).toEqual(2);
      expect(base['foo'][1].id).toEqual(3);
    });

  });

});
