import React, { Component } from 'react';
import Wrapper from './components/Wrapper.jsx'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2b25ldjkyIiwiYSI6ImNqejF4MzR1ZTAwYWIza28zNWdjMXJxOHAifQ.mh6hwQSG0AiksgmB8odk2Q';
class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
          <Wrapper />
        )
    }
}

export default App;