import React, {Fragment, useState} from 'react';
import BusinessResultCard from './BusinessResultCard.jsx';
import ResultCard from './ResultCard.jsx';
import Map from './Map.jsx';
const ResultsWrapper = (props) => {
  const [active, setActive] = useState('EVENTS')
  const events = [];
  const maps = [];
  const businesses = [];
  props.eventBriteResults.forEach((r, idx) => {
    maps.push({...r});
    events.push(<ResultCard key = {'event-result' + idx} {...r} />);
  });
  return (
  <section className = 'results-wrapper'>
    <nav className = 'results-nav'>
      <div 
      className = {active ==='EVENTS' ? 'tab-active results-tab' : 'results-tab'}
      onClick = {() => setActive('EVENTS')}
      >Events</div>
      <div 
      className = {active ==='BUSINESSES' ? 'tab-active results-tab' : 'results-tab '}
      onClick = {() => setActive('BUSINESSES')}
      >Businesses</div>
      <div 
      className = {active ==='MAP' ? 'tab-active results-tab' : 'results-tab ' }
      onClick = {() => setActive('MAP')}
      >Map</div>
    </nav>
    {active === 'EVENTS' 
    ? <section className="result-cards">
    {events}
    </section>
    : active === 'BUSINESSES' 
    ? <section className = 'business-result-cards'>
      <h1>Businesses</h1>
    </section>
    : <Map {...maps}></Map>
    }
  </section>
    
);
}
 
export default ResultsWrapper;