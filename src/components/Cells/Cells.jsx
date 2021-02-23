import React from 'react'
import './Cells.css'

export default function Cells({value, onCellClick}) {

    let classNames = 'cells'
    if (value) {
        classNames += ' cellsInput'
    }

    return (
        <button className={classNames} onClick={onCellClick}>{value}</button>
    )
}
