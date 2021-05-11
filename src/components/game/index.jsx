import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { nanoid } from 'nanoid';
import FlipCard from '../flipcard';
import {CARDS} from './cards.constants';
import './styles.css';

function Container() {
    const history = useHistory();
    const location = useLocation();

    const [cardData,setCardData] = useState([]);
    const [defuseCount, setDefuseCount] = useState(0);
    const [lost,setLost] = useState(false);
    const [isFlippedIndex,setIsFlippedIndex] = useState(null);


    useEffect(()=> {
        if (location?.state?.username) {
            shuffleArray([...CARDS]);
        } else {
            history.push('/');
        }
    }, []);

    useEffect(() => {
        if(lost) {
            startGame();
        }
    },[lost]);

    useEffect(() => {
        console.log(defuseCount)
    }, [defuseCount])
    
    function startGame() {
        alert('You lost the game. Restart Game?');
    }

    function shuffleArray(cards) {
        const cardsArr = [];
        for (let i = 0; i < 5; i ++) {
            const randomIndex = Math.ceil(Math.random() * 10) % 4;
            cardsArr[i] = { ...cards[randomIndex], id: nanoid() };
        }
        setLost(false);
        setCardData(cardsArr);
        setDefuseCount(0);
    }

    function handleClick(index,data) {      
        setIsFlippedIndex(data.id);
        setTimeout(() => {
            if (data.type === 'SHUFFLE') {
                shuffleArray([...CARDS]);
                setIsFlippedIndex(null);
            } else if (data.type === "EXPLODE" && !defuseCount) {
                setLost(true);
                setIsFlippedIndex(null);
                shuffleArray([...CARDS]);
            } else {
                let cnt = defuseCount;

                if (data.type === "DEFUSE") {
                    cnt ++;
                    setDefuseCount(cnt);
                } else if (data.type === 'EXPLODE') {
                    cnt --;
                    setDefuseCount(cnt);
                }

                const newCardData = [...cardData];
                newCardData.splice(index, 1);
                if(!newCardData.length) {
               
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: `${location.state.username}`})
                    };
                    fetch('/update-score', requestOptions)
                        .then(response => response.json())
                        .then(data => console.log(data)); 
                }
                setCardData(newCardData);
                setIsFlippedIndex(null);
            }
        }, 300);  
    }
    function gotoLeaderboard() {
        history.push('/leaderboard')
    }
    function gotoHome() {
        history.push('/');
    }
    return (
        <div>
            <button onClick={gotoLeaderboard}>Leaderboard</button>
            <button onClick={gotoHome}>Home</button>
            <div className="card-container">
                {cardData.map((data,index) => 
                    <FlipCard 
                        front={<div className="card" onClick={() => handleClick(index,data)}></div>}
                        back={<div className="card">{data.name}</div>}
                        isFlipped={isFlippedIndex === data.id}
                    />
                )}
            </div>
            <div>
                {
                    cardData.length === 0 && (
                        <p>Congratulations! You won.</p>
                    )
                }
            </div>
        </div>
    );
}

export default Container;