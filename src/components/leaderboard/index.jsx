import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './styles.css';

function Leaderboard() {
    const history = useHistory();

    const [userData,setUserData] = useState([]);
    const header = ["Rank","Name","Score"];
    useEffect(() =>{
        getLeaderBoard();
    },[]);

    function getLeaderBoard() {
        fetch('/get-leaderboard')
        .then(response => response.json())
        .then(data => setUserData(data));
    }

    function gotoHome() {
        history.push('/');
    }

    function goToGame() {
        history.push('/start-game');
    }
    
    return (
        <div>
            <h2 style={{fontWeight:"bold"}}>Leaderboard</h2>
            <button onClick={goToGame}>Play Game</button>
            <button onClick={gotoHome}>Home</button>
            <div className="container" style={{ backgroundColor: '#f8f8f8',fontWeight:'bold' ,fontSize:19}}>
                {header.map((data,index) => 
                    <div className="content-container">{data}</div>
                )}
            </div>
            {userData.map((data,index) => 
            <div className="container" style={{ backgroundColor: index % 2 === 0 ? '#ececec' : '#f8f8f8'}}>
                <div className="content-container">
                    {`${index+1}`}
                </div>
                <div className="content-container">
                    {data.name}
                </div>
                <div className="content-container">
                    {data.score}
                </div>
            </div>
            )}
        </div>
    )
}

export default Leaderboard;