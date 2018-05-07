//
// DYNAMIC env variables
//

const DEFAULTS = {
  CMS_HOST: 'cms.prx.org',
  AUTH_HOST: 'id.prx.org',
  AUTH_CLIENT_ID: 'lVN05vLI8aCADh7lzbrL0AkDvEfPNuoEPpL2umL5'
};

const addScheme = (name: string, value: any): any => {
  if (name.match(/_HOST$/) && value && !value.startsWith('http')) {
    let scheme = value.match(/.*\.prxu?\.(?:org|tech)$/) ? 'https' : 'http';
    return `${scheme}://${value}`;
  } else {
    return value;
  }
};

const getVar = (name: string): any => {
  if (window && window['ENV'] && window['ENV'][name] !== undefined) {
    return addScheme(name, window['ENV'][name]);
  } else {
    return addScheme(name, DEFAULTS[name]);
  }
};

export class Env {
  public static get CMS_HOST():              string { return getVar('CMS_HOST'); }
  public static get AUTH_HOST():             string { return getVar('AUTH_HOST'); }
  public static get AUTH_CLIENT_ID():        string { return getVar('AUTH_CLIENT_ID'); }
}
