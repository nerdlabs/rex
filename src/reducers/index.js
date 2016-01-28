
import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';

import content from './content';

export default combineReducers({ content, routing });
