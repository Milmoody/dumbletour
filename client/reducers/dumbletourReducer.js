import * as types from '../actions/actionTypes';

const initialState = {
  searchBoxIsOpen: true,
  location: '',
  searchResults: [],
  view:'EVENTS',
  zipcode:''
};

const dumbletourReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOCATION: {
      const location = action.payload;
      return {
        ...state,
        location,
      };
    }

    case types.PROCESS_SEARCH_RESULTS: {
      const searchResults = action.payload
      const searchBoxIsOpen = false;

      return {
        ...state,
        searchResults: searchResults,
        searchBoxIsOpen
      }
    }
    case types.SET_VIEW: {
      const newView = action.payload;
      return {
        ...state,
        view: newView
      }
    }
    case types.UPDATE_ZIP_CODE:{
      const newZip = action.payload;
      return{
        ...state,
        zipcode: newZip
      }
    }
    default:
      return state;
  }
};

export default dumbletourReducer;
