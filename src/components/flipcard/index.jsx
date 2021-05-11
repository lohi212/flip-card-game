import React from 'react';
import './styles.css';

function FlipCard({ front, back, isFlipped }) {

    return (
        <div style={{ margin: 10 }}>
            {
                !isFlipped ? front : back
            }
        </div>
    );
}

export default FlipCard;
