import React, { useEffect, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [turn, setTurn] = useState("X");
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState(null);
    const [round, setRound] = useState(false)
    useEffect(()=>{
        checkWinner();
    },[cells, turn])

    const checkWinner = () => {
        const winConditions = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
        ]

        for(let i=0; i<winConditions.length; i++){
            const conditions = winConditions[i];
            const cellA = cells[conditions[0]];
            const cellB = cells[conditions[1]];
            const cellC = cells[conditions[2]];
    
            if(cellA === "" || cellB === "" || cellC === ""){
                continue;
            }
            if(cellA === cellB && cellB === cellC){
                setRound(true);
                setWinner(cellA);
                break;
            }
            else if (cells.every(cell => cell)){
                setRound(true);
                setWinner('Draw');
            }
        }
    };

    const handleClick = (num) => {
        if (cells[num] === '' && !winner) {
            const newCells = [...cells];
            newCells[num] = turn;
            setCells(newCells);
            setTurn(turn === 'X' ? 'O' : 'X');
            // checkWinner();
        }
    };

    const handleReset = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
        setRound(false);
        setTurn("X");
    };

    const Cell = ({ num }) => {
        return (
            <div className="cell" onClick={() => handleClick(num)}>
                {cells[num] === 'X' && <img src={cross_icon} alt="X" />}
                {cells[num] === 'O' && <img src={circle_icon} alt="O" />}
            </div>
        );
    };

    return (
        <div className='container'>
            <h1 className="title">Tic Tac Toe Game by <span>Sanket</span></h1>
            <div className='announcement'>
                {!round && <h2>It's {turn}'s turn</h2>}
                {round && (<h2>{winner === 'Draw'? 'Match is Drawn':`${winner} IS THE WINNER !!`}</h2>)}
            </div>
            <div className='board'>
                <Cell num={0} />
                <Cell num={1} />
                <Cell num={2} />
                <Cell num={3} />
                <Cell num={4} />
                <Cell num={5} />
                <Cell num={6} />
                <Cell num={7} />
                <Cell num={8} />
            </div>
            <button className='reset' onClick={handleReset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
