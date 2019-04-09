import { TestBed } from '@angular/core/testing';

import { StickyService } from './sticky.service';

describe('StickyService', () => {
  let service: StickyService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(StickyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an "all" offset of 0', () => {
    expect(service.getOffset('all')).toBe(0);
  });

  it('should have an "default" offset of 0', () => {
    expect(service.getOffset()).toBe(0);
  });

  it('should add offset to default group', () => {
    service.addOffset(10);
    expect(service.getOffset()).toBe(10);
    service.addOffset(5);
    expect(service.getOffset()).toBe(15);
  });

  it('should remove offset to default group', () => {
    service.addOffset(10);
    expect(service.getOffset()).toBe(10);
    service.removeOffset(5);
    expect(service.getOffset()).toBe(5);
  });

  it('should add offset to custom group', () => {
    service.addOffset(10, 'custom');
    expect(service.getOffset('custom')).toBe(10);
    service.addOffset(5, 'custom');
    expect(service.getOffset('custom')).toBe(15);
  });

  it('should remove offset to custom group', () => {
    service.addOffset(10, 'custom')
    expect(service.getOffset('custom')).toBe(10);
    service.removeOffset(5, 'custom')
    expect(service.getOffset('custom')).toBe(5);
  });

  it('should add "all" offset to every group', () => {
    service.addOffset(1, 'all');
    service.addOffset(5);
    service.addOffset(10, 'custom');
    expect(service.getOffset('all')).toBe(1);
    expect(service.getOffset()).toBe(6);
    expect(service.getOffset('custom')).toBe(11);
  });
});
