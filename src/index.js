import { Launch } from '@lightningjs/sdk';
import App from './App.js';

export default function () {
  window.App = Launch(App, ...arguments);
  return window.App;
}
