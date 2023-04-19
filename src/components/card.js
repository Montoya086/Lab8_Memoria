import React, { useEffect } from "react";
const MemoryCard =({isFlipped, handleClick, cardInfo, state})=>{
    const handleState=()=>{
        if(state){
            handleClick(cardInfo)
        }
    }
    return(
        <div className = {`card ${isFlipped ? "flipped" : ""}`}>
            <img className="front" src={cardInfo.img} alt="front"/> 
            <img className="back" src={require("./images/back.png").default} onClick= {handleState} alt="back"/>
        </div>
    )
}

export default MemoryCard