import { HalLink } from './hallink';

describe('HalLink', () => {

  it('constructs from a url', () => {
    let link = HalLink.from('http://foo.bar/okay');
    expect(link.title).toEqual('');
    expect(link.name).toEqual('');
    expect(link.profile).toEqual('');
    expect(link.href).toEqual('http://foo.bar/okay');
    expect(link.templated).toEqual(false);
  });

});
