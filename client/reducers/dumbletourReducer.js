import * as types from '../actions/actionTypes';

const initialState = {
  searchBoxIsOpen: true,
  location: '',
  searchResults: [],
  itinerary: {},
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

    case types.SUBMIT_SEARCH: {
      const searchBoxIsOpen = false;
      const toLog = {
        ...state,
        searchBoxIsOpen,
      };
      return toLog;
    }

    case types.PROCESS_SEARCH_RESULTS: {
      const transformedResults = action.payload.map((event) => ({
        // imgUrl: 'http://via.placeholder.com/350x460',
        imgUrl: 'https://i.imgur.com/IVf2QCK.jpg',
        name: event.company,
        price: event.price,
        www: 'www.expelliarmus.aragog',
        ig: event.hashtag.toLowerCase(),
      }));
      const searchBoxIsOpen = false;
      return {
        ...state,
        searchResults: [...transformedResults],
        searchBoxIsOpen,
      };
    }

    default:
      return state;
  }
};

export default dumbletourReducer;
