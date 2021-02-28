import React from 'react'
import classnames from 'classnames'
import './Cells.css'

export default function Cells({value, onCellClick, i, viewBoard}) {

    let classNames = 'cells'
    if (value) {
        classNames += ' cellsInput'
    }

    const viewCells = (viewBoard === 1) ? 'viewCells1' :
        (viewBoard === 2) ? 'viewCells2' :
        'viewCells0'

    return (
        <button className={classnames(classNames, viewCells)} onClick={onCellClick} id={i}>{value}</button>
    )
}
