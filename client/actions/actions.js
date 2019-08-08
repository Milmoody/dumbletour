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

