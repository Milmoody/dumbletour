import React, {Fragment, useState} from 'react';
import BusinessResultCard from './BusinessResultCard.jsx';
import ResultCard from './ResultCard.jsx';
import Map from './Map.jsx';
const ResultsWrapper = (props) => {
  const [active, setActive] = useState('EVENTS')
  let mockdata = {
    name: "The Waterfront Venice",
    imgUrl: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F64648119%2F172016761098%2F1%2Foriginal.20190629-205819?h=200&w=450&auto=compress&rect=0%2C212%2C1000%2C500&s=763656b58bdff7f86cd7de3d09b40c34",
    starttime: "2019-08-31T12:00:00",
    endtime: "2019-08-31T18:00:00",
    description: "LABOR DAY WEEKEND • SOUTHERN CALIFORNIA • ALL AGES FAMILY EVENT\nAdamari Empire presents the 4th Annual Roots & Yam Jerk Food Fest. Bring the family out to enjoy rare juicy delicious JERK chicken, JERK shrimp, JERK fish all sided with your choice of JERK pineapple, jasmine rice, JERK beans and all sort of other tasty food from the Caribbean.",
    longlat: ["-118.48071340000001","33.995139",],
    isFree: false,
    website: 'https://www.eventbrite.com/e/stoked-on-the-beach-tickets-65721692351',
    address: '205 Ocean Front Walk',
    price: '2.64',
    category:'music',
  }
  const maps = [];
  const events = [];
  const businesses = [];
  props.eventSearchResults.forEach((r, idx) => {
    console.log(r);
  events.push(<ResultCard key = {'event-result' + idx} {...r} />);
  maps.push({...r});
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
    : <Map eventLatlong = {...maps}></Map>
    }
  </section>
    
);
}
 
export default ResultsWrapper;