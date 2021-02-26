import React from 'react'
import Cells from '../Cells'
import './Board.css'

export default function Board({onCellClick, board, viewBoard}) {

    const classBoard = (viewBoard === 0) ? 'board' :
    (viewBoard === 1) ? 'board board1' :
    'board board2'

    return (
        <div className={classBoard}>
            {
                board.map((cell, i) => (
                    <Cells key={i} value={cell} viewBoard={viewBoard} i={i} onCellClick={() => onCellClick(i)} />
                ))
            }
        </div>
    )
}
