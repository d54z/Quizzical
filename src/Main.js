import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Die from './Die';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function Main(){
    const [dice , setDice] = React.useState(allNewDies())
    const [tenzies , setTenzies] = React.useState(false)
    let buttonText 
    buttonText = 'Roll'
    function allNewDies(){
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }


    

    
    const AllDies = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
        ))

    function holdDice(id){
     
                setDice(prev => prev.map(dic =>{
                    return dic.id === id ?
                    {...dic , isHeld : !dic.isHeld} :
                    dic
                }))
    }


    function roll(){
        if (tenzies){
            setDice(allNewDies())
            setTenzies(false)
         }  else{
        setDice(prev => prev.map(dic =>{
            return dic.isHeld === true ? dic : {value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()}
        }))}
    }

    React.useEffect(() => {
        const isAllHeld = dice.every(die =>die.isHeld ) /* that will check if every elemnt in the array have the same value in isHeld 8*/
        const checkingDice = dice[0]
        const isAllSameValue = dice.every(die => die.value === checkingDice.value )
        if ((isAllHeld) && (isAllSameValue)){
            setTenzies(true)

        }

    } , [dice])


        return(
        <main className='Main'>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='DiesContainer'>
              {AllDies}
            </div>
            <button onClick={roll} className='rollBtn'>{tenzies ? 'Again ?' : 'Roll'}</button>
        </main>
    )
}


