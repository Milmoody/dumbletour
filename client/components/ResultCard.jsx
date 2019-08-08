import React from 'react';

const ResultCard = props =>(
  <div className="result-card event-card">
    <img className = 'card-img' src={props.image}></img>
    <h2 className="card-name"><a href = {props.website}>{props.name}</a></h2>
    <p className = 'card-start-end'>{props.starttime}-{props.endtime}</p>
    <p className = 'card-category'>{props.categories}</p>
    <p className = 'card-description'>{props.description}</p>
    <p className = 'card-address'>{props.address}</p>
    {props.isFree 
    ? <p className = 'card-isfree'>FREE EVENT!</p> 
    : <p className="card-price">${props.price}</p>
    }
    <div className= "not-liked-heart"></div>
  </div> 
)

export default ResultCard;