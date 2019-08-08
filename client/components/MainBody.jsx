import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ResultCard from './ResultCard.jsx'
import ResultsWrapper from './ResultsWrapper.jsx';
import * as actions from '../actions/actions.js';
import SearchModal from './SearchModal.jsx';

const mapStateToProps = (store) => ({
  searchBoxIsOpen: store.dumbletour.searchBoxIsOpen,
  zipcode: store.dumbletour.zipcode,
  searchResults: store.dumbletour.searchResults,
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
        : <ResultsWrapper 
          searchBoxIsOpen = {this.props.searchBoxIsOpen}
          eventBriteResults = {this.props.searchResults}></ResultsWrapper>}
        </div>
        )
    }
 }

export default connect(mapStateToProps)(MainBody);