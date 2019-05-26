import * as firebase from 'firebase/app';
import 'firebase/messaging';
import axios from 'axios';

export function updateSubscriptionOnServer(token: string = '') {
  axios.post('/profile/pushtoken', {pushToken: token});
}

export const subscribeUser = (success: Function, error: Function) => {
  var messaging = firebase.messaging();
  messaging
    .requestPermission()
    .then(() => {
      messaging
        .getToken()
        .then((currentToken) => {
          if (currentToken) {
            updateSubscriptionOnServer(currentToken);
          } else {
            updateSubscriptionOnServer();
          }
          success(currentToken);
        })
        .catch((err) => {
          console.log(err);
          updateSubscriptionOnServer();
          error();
        });
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
      error();
    });
};

export const unsubscribeUser = (success: Function, error: Function) => {
  var messaging = firebase.messaging();
  messaging
    .getToken()
    .then(currentToken => {
      currentToken && messaging
        .deleteToken(currentToken)
        .then(() => {
          updateSubscriptionOnServer();
          success();
        })
        .catch((err) => {
          error();
          console.log('Unable to delete token. ', err);
        });
    })
    .catch((err) => {
      error();
      console.log('Error retrieving Instance ID token. ', err);
    });
};

