import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = (store) => ({
    searchBoxIsOpen: store.dumbletour.searchBoxIsOpen,
    zipcode: store.dumbletour.zipcode,
});

const mapDispatchToProps = dispatch =>({
    handleKey:(e) => {
        dispatch(actions.updatezipcode(e.target.value))
    },
    submitSearch: (e) => {
        e.preventDefault();
        dispatch(actions.submitSearch());
    }
})   

class SearchModal extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
        <span className="search-modal">
          <form className="search-form">
            <label htmlFor = 'zipcode'>
              Zip Code
              </label>
            <input type='text' name = 'zipcode' value={this.props.zipcode} onChange={(e) => this.props.handleKey(e)} placeholder='Zip Code'></input>
            <button onClick={(e)=> this.props.submitSearch(e)}>Follow the Yellow Brick Road</button>
          </form>
        </span>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);