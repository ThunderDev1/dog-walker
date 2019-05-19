/* eslint-disable @typescript-eslint/camelcase */
import { createUserManager } from 'redux-oidc';
import { UserManagerSettings } from 'oidc-client';

declare const IDENTITY_SERVER_URL: string;
declare const SPA_URL: string;

const userManagerConfig: UserManagerSettings = {
  client_id: 'dwk',
  redirect_uri: `${SPA_URL}/#/callback`,
  response_type: 'token id_token',
  scope:"openid profile dwk-api",
  authority: IDENTITY_SERVER_URL,
  silent_redirect_uri: `${SPA_URL}/silentRenew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;