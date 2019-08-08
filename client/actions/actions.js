import * as types from './actionTypes';


export const updateLocation = value => ({
  type: types.UPDATE_LOCATION,
  payload: value,
});


export const searchResults = results => ({
  type: types.PROCESS_SEARCH_RESULTS,
  payload: results,
});


// thunk that handles search request
export const submitSearch = () => (dispatch, getState) => {
  dispatch(searchResults([{company: "Pikachu", price: 42, hashtag: 'pikaPIKAAAA'}]))

};

