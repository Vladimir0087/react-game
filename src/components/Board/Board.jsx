import React from 'react'
import Cells from '../Cells'
import './Board.css'

export default function Board({onCellClick, board, viewBoard, arrRef}) {

    // const cellRef1 = useRef(null)
    // const cellRef2 = useRef(null)
    // const cellRef3 = useRef(null)
    // const cellRef4 = useRef(null)
    // const cellRef5 = useRef(null)
    // const cellRef6 = useRef(null)
    // const cellRef7 = useRef(null)
    // const cellRef8 = useRef(null)
    // const cellRef9 = useRef(null)
    // const arrRef = [cellRef1, cellRef2, cellRef3, cellRef4, cellRef5, cellRef6, cellRef7, cellRef8, cellRef9]

    // document.addEventListener('keydown', function(e) {
    //     if (e.key === '1' && cellRef7.current) cellRef7.current.click()
    //     if (e.key === '2' && cellRef8.current) cellRef8.current.click()
    //     if (e.key === '3' && cellRef9.current) cellRef9.current.click()
    //     if (e.key === '4' && cellRef4.current) cellRef4.current.click()
    //     if (e.key === '5' && cellRef5.current) cellRef5.current.click()
    //     if (e.key === '6' && cellRef6.current) cellRef6.current.click()
    //     if (e.key === '7' && cellRef1.current) cellRef1.current.click()
    //     if (e.key === '8' && cellRef2.current) cellRef2.current.click()
    //     if (e.key === '9' && cellRef3.current) cellRef3.current.click()
    // });




    const classBoard = (viewBoard === 0) ? 'board' :
    (viewBoard === 1) ? 'board board1' :
    'board board2'


    return (
        <div className={classBoard}>
            {
                board.map((cell, i) => (
                    <Cells key={i} value={cell} btnRef={arrRef[i]} viewBoard={viewBoard} i={i} onCellClick={() => onCellClick(i)} />
                ))
            }
        </div>
    )
}
