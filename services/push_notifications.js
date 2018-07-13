import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';
/* NOTE: Update this to use your own Node server */

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(`Push Token: ${previousToken}`);
  /*
    NOTE: Use for testing by sending pushToken & message
    to rallycoding.herokuapp.com/api/tokens/push
  */
  if (previousToken) return;

  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  await axios.post(PUSH_ENDPOINT, { token: { token } });
  AsyncStorage.setItem('pushtoken', token);
};
