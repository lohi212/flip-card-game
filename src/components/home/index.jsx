import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './styles.css';

function Home() {
    const history = useHistory();
    const[input,setInput] = useState('');
    
    function handleClick() {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: `${input}`,score:0 })
        };
        fetch('/save-user-score', requestOptions)
            .then(response => response.json())
            .then(data => {
                history.push({ pathname: '/start-game', state: { username: input }});
            });    
    }

    return (
        <div>
            <h2>Welcome to Exploding Kitten</h2>
            <input placeholder="Enter UserName" onChange={(e) => setInput(e.target.value)}></input>
            <button disabled={!input} onClick={handleClick}>Start Game</button>
            <button onClick={() => {
                history.push('/leaderboard')
            }}>Leaderboard</button>
            <div style={{ textAlign: 'left', margin: 40 }}>
                <h2> Game Rules: </h2>
                <p>If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
                <p>If the card is exploding kitten (bomb) then the player loses the game.</p>
                <p>If the card is defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
                <p>If the card is shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
            </div>
        </div>
    );
}

export default Home;