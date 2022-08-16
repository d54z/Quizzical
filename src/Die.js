import React from 'react';
import ReactDOM from 'react-dom/client';

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : 'white'
    }
    return(
        <div onClick={() => props.holdDice(props.id)} style = {styles} className='Die'>
            <h2>{props.value} </h2>
        </div>
    )
}