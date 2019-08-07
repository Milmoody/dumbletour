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
        const resultCards = this.props.searchResults.map((r) => {
          return <ResultCard  key={r.name} 
                              imgUrl={r.imgUrl}
                              name={r.name} 
                              price={r.price}
                              www={r.www}
                              ig={r.ig}
                              id={r.id}
                              />;});
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

export default connect(mapStateToProps)(MainBody);