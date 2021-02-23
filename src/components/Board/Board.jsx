import React from 'react'
import Cells from '../Cells'
import './Board.css'

export default function Board({onCellClick, board}) {
    return (
        <div className='board'>
            {
                board.map((cell, i) => (
                    <Cells key={i} value={cell} onCellClick={() => onCellClick(i)} />
                ))
            }
        </div>
    )
}
