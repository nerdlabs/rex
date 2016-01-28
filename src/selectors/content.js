
import { createSelector } from 'reselect';

export const homeContentSelector = createSelector(
  (state) => state.content.home,
  (content) => ({ content })
);

export const aboutContentSelector = createSelector(
  (state) => state.content.about,
  (content) => ({ content })
);
