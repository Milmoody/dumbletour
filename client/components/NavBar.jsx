import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NavOptions from './NavOptions.jsx';


const mapStateToProps = (store) => ({
      
});

const mapDispatchToProps = dispatch =>({

});


class NavBar extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return(
    <Fragment>
      <nav className="nav-bar">
        <h1 id='logo'>Dumbletour</h1>
        {/* <button className="sign-in"> */}
        <div id="g-signin2" data-onsuccess={this.onSignIn} />
        {/* </button> */}
        <NavOptions/>
     </nav>
    </Fragment>
    )}

    // componentDidMount() {
    //   window.gapi.signin2.render('g-signin2', {
    //     'scope': 'https://www.googleapis.com/auth/plus.login',
    //     'width': 75,
    //     'height': 25,
    //     'longtitle': false,
    //     'theme': 'light',
    //     'onsuccess': this.onSignIn
    //   });
    // }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);