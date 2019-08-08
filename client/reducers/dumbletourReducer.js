import * as types from '../actions/actionTypes';

const initialState = {
  searchBoxIsOpen: true,
  location: '',
  eventBriteResults: [],
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

    case types.PROCESS_EVENTBRITE_RESULTS: {
      const eventBriteResults = action.payload
      const searchBoxIsOpen = false;

      return {
        ...state,
        eventBriteResults: eventBriteResults,
        searchBoxIsOpen
      }
    }

    case types.PROCESS_YELP_RESULTS:{
      const yelpResults = action.payload
      return {
        ...state,
        yelpResults: yelpResults
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
