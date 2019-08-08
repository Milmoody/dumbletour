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
  fetch('/api/search' , {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({zipcode}),
  })
  .then( res => res.json())
  .then((resultsArr)=>{
    console.log(resultsArr)
    dispatch(searchResults(resultsArr));
  })
  // promise.all - and send the results back to the client. 
};

// thunk that adds itinerary item
