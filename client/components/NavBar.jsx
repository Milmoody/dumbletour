import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
    <Fragment>
      <nav className="nav-bar">
        <h1 id='logo'>RainbowCity</h1>
        <div id="g-signin2" data-onsuccess={this.onSignIn} />
     </nav>
    </Fragment>
    )}
}

export default NavBar;