import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchModal from './SearchModal.jsx'
import ResultCard from './ResultCard.jsx'
import * as actions from '../actions/actions.js';

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
        <div className={this.props.searchBoxIsOpen ? "main-body-with-modal": "main-body-without-modal" }>
          {this.props.searchBoxIsOpen ? 
          <Fragment>
            <SearchModal />
          </Fragment>
          : null}
          <section className="result-cards">
          </section>
        </div>
        )
    }
 }

export default connect(mapStateToProps)(MainBody);