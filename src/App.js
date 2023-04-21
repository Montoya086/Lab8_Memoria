import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import MemoryCard from "./components/card?uniqueID=123";
import img1 from "./components/images/react.png"
import img2 from "./components/images/babel.png"
import img3 from "./components/images/flutter.png"
import img4 from "./components/images/node.png"
import img5 from "./components/images/sass.png"
import img6 from "./components/images/webpack.png"
import img7 from "./components/images/firebase.png"
import img8 from "./components/images/bootstrap.png"
import imgwin from "./components/images/win.png"
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: '#FFF',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const [cards, setCards] = useState([])
  const [movs, setMovs] = useState(0)
  const [corrects, setCorrects] = useState(8)
  const [flipped1, setFlipped1] = useState(null)
  const [flipped2, setFlipped2] = useState(null)
  const [state, setState] = useState(true)
  const [win, setWin] = useState(false)
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
        setCorrects(corrects+1)
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
    if(corrects===cardImg.length){
      setTimeout(() => {
        setWin(true)
      }, 1750);
    }
  },[flipped1,flipped2])

  const handleFail =()=>{
    setFlipped1(null)
    setFlipped2(null)
    setState(true)
  }

  const handleClose=()=>{
    setWin(false)
    window.location.reload(false);
  }

  return(
    <>
    <div className="body">
      <div className="header">
          <p>Movimientos: {movs}</p>
          <p>Aciertos: {corrects}</p>
          <Button onClick={handleClose}>Reiniciar</Button>
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
    <Modal open={win} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className="container modal-box">
            Has ganado!
            <img src={imgwin} className="win-img"/>
          </div>
        </Typography>
      </Box>
    </Modal>
    </>
  )
};

export default App;