import {combineReducers} from 'redux';

import ConfigReducer from './reducer-config';
import PlayerReducer from './reducer-player';

export default combineReducers({
  config: ConfigReducer,
  player: PlayerReducer,
});
