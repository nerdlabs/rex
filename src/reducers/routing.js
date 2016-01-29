
import { createSelector } from 'reselect';

import { selectRouting } from '.';

export const selectLocation = createSelector(
  selectRouting,
  state => state.location
);

export { routeReducer as default } from 'react-router-redux';
