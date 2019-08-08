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

//   const {
//     location, latitude, longitude, arrivalDate, departureDate,
//   } = getState().dumbletour;
  // console.log('location, latitude, longitude, arrivalDate, departureDate ', location, latitude, longitude, arrivalDate, departureDate);
const { zipcode } = getState().dumbletour;
  fetch('/api/search', {
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
  dispatch(searchResults([{company: "Pikachu", price: 42, hashtag: 'pikaPIKAAAA'}]))

};

