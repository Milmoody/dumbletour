import React from 'react';

const BusinessResultCard = props =>{
  
  function formatDescription (desc) {
    if (desc.length > 100) return desc.subStr(0, 100) + '..img.';
    return desc;
  }
  return (
  <div className="result-card business-card">
    <img className = 'card-img' src={props.imgUrl}></img>
    <h2 className="card-name"><a href = {props.website}>{props.name}</a></h2>
    <p className = 'card-start-end'>{props.starttime}-{props.endtime}</p>
    <p className = 'card-category'>{props.category}</p>
    <p className = 'card-description'>{formatDescription(props.description)}</p>
    <p className = 'card-address'>{props.address}</p>
    <p className="card-price">${props.price}</p>
    }
    <div className= "not-liked-heart"></div>
  </div> 
)}

export default BusinessResultCard;