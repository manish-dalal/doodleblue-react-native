import Realm from 'realm';
import config from '../../config';

let app;
export function getRealmApp() {
  if (app === undefined) {
    const appConfig = {
      id: config.realmAppId,
      timeout: 10000,
      app: { name: 'default', version: '0' },
    };
    app = new Realm.App(appConfig);
  }
  return app;
}

export const OpenRealmBehaviorConfiguration = {
  type: 'openImmediately',
};
