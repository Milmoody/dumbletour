import * as types from './actionTypes';


export const updateLocation = value => ({
  type: types.UPDATE_LOCATION,
  payload: value,
});


export const eventBriteResults = results => ({
  type: types.PROCESS_EVENTBRITE_RESULTS,
  payload: results,
});

export const yelpResults = results => ({
  type: types.PROCESS_YELP_RESULTS,
  payload: results
})

export const setView = view => ({
  type: types.SET_VIEW,
  payload: view
})

export const updateZipCode = zipcode => ({
  type: types.UPDATE_ZIP_CODE,
  payload: zipcode,
})

// thunk that handles search request

export const searchEventBrite = (zipcode) => (dispatch, getState) => {
  // make a fetch request to yelp / Eventbrite
  fetch('/api/search' , {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({zipcode}),
  })
  .then( res => res.json())
  .then((resultsArr)=>{
    console.log(resultsArr)
    dispatch(eventBriteResults(resultsArr));
  })
  // promise.all - and send the results back to the client. 
};

export const searchYelp = (zipcode) => (dispatch,getState) => {

  fetch('/api/businesses', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({zipcode}),
  })
  .then( res => res.json())
  .then((resultsArr) => {
    dispatch(yelpResults(resultsArr))
  })
}

// thunk that adds itinerary item
