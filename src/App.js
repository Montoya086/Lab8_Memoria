import React, { useEffect, useState } from "react";
import MemoryCard from "./components/card";

const App = () => {

  const [flipped, setFlipped]=useState(false);
  const handleClick=()=>{
    setFlipped(!flipped)
  }

  useEffect(()=>{
    if(flipped){
      setTimeout(() => {
        setFlipped(!flipped)
      }, 5000);
    }
  },[flipped])

  return(
    <div className="container">
      <div className="game-grid">
      <MemoryCard isFlipped ={flipped} handleClick={handleClick}/>
      </div>
    </div>
  )
};

export default App;