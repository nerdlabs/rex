'use strict';

import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';

import content from './content';

export default combineReducers({ content, routing });
