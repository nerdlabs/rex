
import { createSelector } from '.';

export const selectLocation = createSelector(
  __filename,
  state => state.location
);

export { routeReducer as default } from 'react-router-redux';
