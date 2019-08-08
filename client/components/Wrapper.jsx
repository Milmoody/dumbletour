import React, { Component } from 'react';
import MainBody from './MainBody.jsx';
import NavBar from './NavBar.jsx';

const Wrapper = props =>(
    <React.Fragment>
        <NavBar/> 
        <MainBody/>
    </React.Fragment>
)

export default Wrapper;