import * as types from './actionTypes';

export const startRegistration = () => ({
  type: types.START_REGISTRATION,
});

export const completeRegistration = () => ({
  type: types.COMPLETE_REGISTRATION,
});

export const updateLocation = value => ({
  type: types.UPDATE_LOCATION,
  payload: value,
});

export const updateArrivalDate = value => ({
  type: types.UPDATE_ARRIVAL_DATE,
  payload: value,
});

export const updateDepartureDate = value => ({
  type: types.UPDATE_DEPARTURE_DATE,
  payload: value,
});

export const searchResults = results => ({
  type: types.PROCESS_SEARCH_RESULTS,
  payload: results,
});

export const addToItinerary = addedItem => ({
  type: types.ADD_TO_ITINERARY,
  payload: addedItem,
});

// thunk that handles search request
export const submitSearch = () => (dispatch, getState) => {
//   const {
//     location, latitude, longitude, arrivalDate, departureDate,
//   } = getState().dumbletour;
  // console.log('location, latitude, longitude, arrivalDate, departureDate ', location, latitude, longitude, arrivalDate, departureDate);
const { location } = getState().dumbletour;
  fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      location
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