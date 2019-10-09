import { combineReducers } from 'redux';

import counter from './counter/reducer';
import toggleSimulator from './simulator/reducer';

export default combineReducers({
  counter,
  toggleSimulator,
});
