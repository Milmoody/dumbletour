import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps = (store) => ({
    searchBoxIsOpen: store.dumbletour.searchBoxIsOpen,
    zipcode: store.dumbletour.zipcode,
    searchResults: store.dumbletour.searchResults
});

const mapDispatchToProps = dispatch =>({
    handleKey:(e) => {
        dispatch(actions.updateZipCode(e.target.value))
    },
    submitSearch: (e,zipcode) => {
        e.preventDefault()
        dispatch(actions.submitSearch(zipcode));
    }
})   

class SearchModal extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
        <span className="search-modal">
          <form className="search-form" onSubmit={(e)=>{this.props.submitSearch(e,this.props.zipcode)}}>
            <label htmlFor = 'zipcode'>
              Zip Code
              </label>
            <input type='text' name = 'zipcode' onChange={(e) => this.props.handleKey(e)} placeholder='Zip Code'></input>
            <button type='submit'> Follow the Yellow Brick Road</button>
          </form>
        </span>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);