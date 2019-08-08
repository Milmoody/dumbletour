import * as types from './actionTypes';


export const updateLocation = value => ({
  type: types.UPDATE_LOCATION,
  payload: value,
});


export const searchResults = results => ({
  type: types.PROCESS_SEARCH_RESULTS,
  payload: results,
});

export const setView = view => ({
  type: types.SET_VIEW,
  payload: view
})

export const updateZipCode = zipcode => ({
  type: types.UPDATE_ZIP_CODE,
  payload: zipcode,
})

// thunk that handles search request
export const submitSearch = (zipcode) => (dispatch, getState) => {
  // make a fetch request to yelp / Eventbrite
  fetch('/api');
 
  // promisify both requests 

  // promise.all - and send the results back to the client. 


  dispatch(searchResults(zipcode));
};

