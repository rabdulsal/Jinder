import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { FB_APP_ID } from '../private/credentials';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// How to use AsyncStorage;
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    loginViaFacebook(dispatch);
  }
};

const loginViaFacebook = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
