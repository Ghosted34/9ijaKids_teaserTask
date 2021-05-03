import React from 'react';
import './GameCard.css'

const GameCard = (props) =>{
    return(
        <div className = "gamecard">
            <img src = {props.image} alt = {props.title}/>
            <div className="descript">
            <p className = "title">{props.title}</p>
            <p className = "desc">{props.desc}</p>    
            </div>
        </div>

    )
}

export default GameCard;