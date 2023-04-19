import React from "react";
const MemoryCard =({isFlipped, handleClick})=>{
    return(
        <div className = {`card ${isFlipped ? "flipped" : ""}`}>
            <img className="front" src={require("./images/pochita.png").default} alt="front"/> 
            <img className="back" src={require("./images/back.png").default} onClick= {handleClick} alt="back"/>
        </div>
    )
}

export default MemoryCard