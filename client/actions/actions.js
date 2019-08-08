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
  const { zipcode } = getState().dumbletour;
  fetch('/api/businesses', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      zipcode
    }),
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch((err) => {
      console.log('There was an error in the thunk: ', err)
    });
  // dispatch(searchResults([{company: "Pikachu", price: 42, hashtag: 'pikaPIKAAAA'}]))
};

// thunk that adds itinerary item
export const addToItineraryRequest = id => (dispatch, getState) => {
  const { user } = getState().dumbletour;

  fetch('/api/itinerary/add', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      user, id,
    }),
  })
    .then(() => dispatch(addToItinerary(id)))
    .catch((err) => {
      console.log('There was an error in the thunk: ', err)
    });
};