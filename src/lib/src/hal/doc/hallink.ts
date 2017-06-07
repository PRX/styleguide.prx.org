export class HalLink {
  static from(url: string): HalLink {
    return new HalLink('', '', '', url, false);
  }
  constructor(
    public title: string,
    public name: string,
    public profile: string,
    public href: string,
    public templated: boolean
  ) {}
}

export class HalLinkError extends Error {
  name = 'HalLinkError';
}
