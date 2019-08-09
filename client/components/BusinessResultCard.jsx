import React from 'react';

const BusinessResultCard = props =>{
  
  console.log(props);
  return (
  <div className="result-card business-card">
    {props.openToAll ? <h1 className = 'openToAll'>Open to All</h1> : null}
    {props.genderNeutralBathrooms ? <h1 className = 'genderNeutral'>Gender Neutral Bathrooms</h1> : null}
    <img className = 'card-img' src={props.image}></img>
    <h2 className="card-name"><a href = {props.url}>{props.name}</a></h2>
    <div >
    {props.categories.map((cat,idx) => {
      return <p key = {'cat'+idx} className = 'card-categories'>{cat}</p>
    })}
    </div>
    <p  className = 'card-reviewCount'>Number of Reviews: {props.numReviews}</p>
    <p className = 'card-price'>rating: {props.rating}, price: {props.price}</p>
    <p className = 'card-address'>{props.location.display_address}</p>
    <p className = 'card-phone'>{props.phone}</p>
  </div> 
)}

export default BusinessResultCard;