import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchModal from './SearchModal.jsx'
import ResultCard from './ResultCard.jsx'
import * as actions from '../actions/actions.js';

const mapStateToProps = (store) => ({
  searchBoxIsOpen: store.dumbletour.searchBoxIsOpen,
  location: store.dumbletour.location,
  arrivalDate: store.dumbletour.arrivalDate,
  departureDate: store.dumbletour.departureDate,
  searchResults: store.dumbletour.searchResults,
  itinerary: store.dumbletour.itinerary
}); 

const mapDispatchToProps = dispatch =>({
  addToItineraryRequest: (id) => {
    dispatch(actions.addToItineraryRequest(id));
}});  

class MainBody extends Component{
    constructor(props){
        super(props);
    }
    render(){
        // transform raw results into jsx tags
        const resultCards = this.props.searchResults.map((r) => {
          return <ResultCard  key={r.name} 
                              imgUrl={r.imgUrl}
                              name={r.name} 
                              price={r.price}
                              www={r.www}
                              ig={r.ig}
                              id={r.id}
                              itineraryItems={Object.keys(this.props.itinerary)}
                              addToItinerary={this.props.addToItineraryRequest}/>;});
        return(
        <div className={this.props.searchBoxIsOpen ? "main-body-with-modal": "main-body-without-modal" }>
          {this.props.searchBoxIsOpen ? 
          <Fragment>
            <SearchModal />
          </Fragment>
          : null}
          <section className="result-cards">
          {resultCards}
          </section>
        </div>
        )
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);