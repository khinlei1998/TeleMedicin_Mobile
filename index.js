/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import './shim.js';

import { AppRegistry } from 'react-native';

import App from './App';

import { name as appName } from './app.json';

import 'react-native-get-random-values';

import crypto from 'react-native-crypto';

import i18next from './src/modules/language/i18n'
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
