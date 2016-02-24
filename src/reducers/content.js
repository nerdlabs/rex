
import { fetchJSON } from '../network';

export const UPDATE_HOME_CONTENT = 'UPDATE_HOME_CONTENT';
export const UPDATE_ABOUT_CONTENT = 'UPDATE_ABOUT_CONTENT';

export function fetchHomeContent() {
  return (dispatch) => fetchJSON('home').then(
    payload => dispatch({ type: UPDATE_HOME_CONTENT, payload })
  );
}

export function fetchAboutContent() {
  return (dispatch) => fetchJSON('about').then(
    payload => dispatch({ type: UPDATE_ABOUT_CONTENT, payload })
  );
}

export default function (state = { home: {}, about: {} }, action) {
  switch (action.type) {
    case UPDATE_HOME_CONTENT:
      return {
        ...state,
        home: { ...state.home, ...action.payload }
      };
    case UPDATE_ABOUT_CONTENT:
      return {
        ...state,
        about: { ...state.about, ...action.payload }
      };
    default:
      return state;
  }
}
