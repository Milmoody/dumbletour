import React from 'react';

const ResultCard = props =>(
  <div className="result-card">
    <img src={props.imgUrl}></img>
    <h2 className="card-name">{props.name}</h2>
    <div className="card-www">{props.www}</div>
    <div className="card-ig">#{props.ig}</div>
    <div className="card-price">{props.price}</div>
    <div className= "not-liked-heart"></div>
  </div> 
)

export default ResultCard;