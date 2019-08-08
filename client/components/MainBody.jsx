import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ResultCard from './ResultCard.jsx'
import ResultsWrapper from './ResultsWrapper.jsx';
import * as actions from '../actions/actions.js';
import SearchModal from './SearchModal.jsx';
import { log } from 'util';

const mapStateToProps = (store) => ({
  searchBoxIsOpen: store.dumbletour.searchBoxIsOpen,
  zipcode: store.dumbletour.zipcode,
  eventBriteResults: store.dumbletour.eventBriteResults,
  yelpResults: store.dumbletour.yelpResults
}); 

class MainBody extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="main-body-with-modal">
        {this.props.searchBoxIsOpen 
        ? <SearchModal /> 
        : this.props.yelpResults || this.props.eventBriteResults
        ? <ResultsWrapper 
          searchBoxIsOpen = {this.props.searchBoxIsOpen}
          eventBriteResults = {this.props.eventBriteResults}
          yelpResults = {this.props.yelpResults}></ResultsWrapper>
        : <React.Fragment>
        <iframe src="https://giphy.com/embed/xTk9ZvMnbIiIew7IpW" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </React.Fragment>}
        </div>
        )
    }
 }

export default connect(mapStateToProps)(MainBody);