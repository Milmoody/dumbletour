import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';


class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapLoaded: false
    }
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/devonev92/cjz213rde75ed1crvyagglsv9',
    })
    this.map.on('load', () => {
      this.setState({mapLoaded: true});
    })
  }

  componentDidUnMount() {
    this.map.remove();
  }

  render() {
return ( <section className = 'Map'>
 <div ref = {this.mapRef}></div> 
    </section>);
  }
}
 
export default Map;