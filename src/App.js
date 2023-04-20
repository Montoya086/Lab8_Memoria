import React, { useEffect, useState } from "react";
import MemoryCard from "./components/card?uniqueID=123";
import img1 from "./components/images/react.png"
import img2 from "./components/images/babel.png"
import img3 from "./components/images/flutter.png"
import img4 from "./components/images/node.png"
import img5 from "./components/images/sass.png"
import img6 from "./components/images/webpack.png"
import img7 from "./components/images/firebase.png"
import img8 from "./components/images/bootstrap.png"
const cardImg = [
  { img: img1, paired: false},
  { img: img2, paired: false},
  { img: img3, paired: false},
  { img: img4, paired: false},
  { img: img5, paired: false},
  { img: img6, paired: false},
  { img: img7, paired: false},
  { img: img8, paired: false},
]

const App = () => {
  const [cards, setCards] = useState([])
  const [movs, setMovs] = useState(0)
  const [flipped1, setFlipped1] = useState(null)
  const [flipped2, setFlipped2] = useState(null)
  const [state, setState] = useState(true)
  useEffect(() => {
    shuffle()
  }, [])

  const shuffle = () => {
    const shuffledCards = [...cardImg, ...cardImg].sort(() => Math.random() -0.5).map((card) => ({...card, id: Math.random()}))
    setFlipped1(null)
    setFlipped2(null)
    setCards(shuffledCards)
    setMovs(0)
  }

  const handleClick=(card)=>{
    if(flipped1){
      setFlipped2(card)
    }else{
      setFlipped1(card)
    }
  }

  useEffect(()=>{
    if(flipped1 && flipped2){
      setMovs(movs+1)
      setState(false)
      if(flipped1.img===flipped2.img){
        flipped1.paired=true
        flipped2.paired=true
        setState(true)
        setFlipped1(null)
        setFlipped2(null)
      }else{
        setTimeout(() => {
          handleFail()
        }, 1500);
      }
    }
  },[flipped1,flipped2])

  const handleFail =()=>{
    setFlipped1(null)
    setFlipped2(null)
    setState(true)
  }

  return(
    <div className="body">
      <div className="header">
          <p>Movimientos: {movs}</p>
      </div>
      <div className="container">
        <div className="game-grid">
        {cards&&(
          <>
            {cards.map(card=>(
              <MemoryCard key={card.id} cardInfo={card} handleClick={handleClick} isFlipped={card === flipped1 || card === flipped2 || card.paired} state={state}/>
            ))}
          </>
        )}
        </div>
      </div>
    </div>
  )
};

export default App;