import React, { useState }from 'react'
import Board from '../Board'
import './Game.css'

export default function Game() {
    const [xMove, setXMove] = useState(true)
    const [board, setBoard] = useState(Array(9).fill(''))
    const [moves, setMoves] = useState(0)

    const win = (data) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                return data[a]
            }
        }
        return ''
    }

    const isWinner = win(board)

    const onCellClick = (ind) => {
        const boardChange = [...board]
        if (boardChange[ind] || isWinner) return
        if (xMove) {
            boardChange[ind] = 'X'
        } else {
            boardChange[ind] = 'O'
        }
        setBoard(boardChange)
        setXMove((s) => !s)
        setMoves((s) => s + 1)
    }

    const playNewGame = () => {
        setBoard(Array(9).fill(''))
        setMoves(0)
        setXMove(true)
    }

    const newGame = <button className="startBtn" onClick={playNewGame}> Начать новую игру </button>

    const infoGameText = isWinner ? `Победил ${isWinner}` :
        (moves === 9 && !isWinner) ? `Ничья` :
        `Сейчас ходит ${ xMove ? 'X' : 'O'}`

    const infoGame = <span className="infoGame">{infoGameText}</span>

    return (
        <div className='wrapp'>
            { newGame }
            <Board onCellClick={onCellClick} board={board}/>
            { infoGame }
        </div>
    )
}
