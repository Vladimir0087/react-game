import React, { useState }from 'react'
import Board from '../Board'
import Footer from '../Footer'
import SoundPlayer from '../SoundPlayer'
import MusicPlayer from '../MusicPlayer'
import click from '../../assets/click.mp3'
import './Game.css'

export default function Game() {
    const [xMove, setXMove] = useState(true)
    const [board, setBoard] = useState(Array(9).fill(''))
    const [moves, setMoves] = useState(0)
    const [changeMoveMode, setChangeMoveMode] = useState(false)
    const [viewBoard, setViewBoard] = useState(0)
    const [soundOn, setSoundOn] = useState(true)

    const clickSound = new Audio(click)

    const soundOnOff = (s) => {
        setSoundOn(s)
    }

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
        if (soundOn) clickSound.play();
        if (xMove) {
            boardChange[ind] = 'X'
        } else {
            boardChange[ind] = 'O'
        }
        setBoard(boardChange)
        setXMove((s) => !s)
        setMoves((s) => s + 1)

    }

    // if (isWinner) {
    //     arr.forEach(element => {
    //         let el = document.getElementById(element)
    //         el.classList.add('winCells')
    //     });
    //     console.log(arr)
    // }

    const playNewGame = () => {
        if (soundOn) clickSound.play();
        setBoard(Array(9).fill(''))
        setMoves(0)
        changeMoveMode ? setXMove(false) : setXMove(true)
    }

    const newGame = <button className="startBtn" onClick={playNewGame}> Начать новую игру </button>

    const infoGameText = isWinner ? `Победил ${isWinner}` :
        (moves === 9 && !isWinner) ? `Ничья` :
        `Сейчас ходит ${ xMove ? 'X' : 'O'}`

    const infoGame = <span className="infoGame">{infoGameText}</span>

    const openFullscreen = () => {
        if (soundOn) clickSound.play();
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        }
    }
    const closeFullscreen = () => {
        if (soundOn) clickSound.play();
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    const fullScreenMode = () => {
        return (
            <div className='fullScreenMode'>
                <button className="fullScreenBtn" onClick={openFullscreen}>Во весь экран</button>
                <button className="fullScreenBtn" onClick={closeFullscreen}>Закрыть во всеь экран</button>
            </div>
        )
    }
    const changeStartMove = () => {
        if (soundOn) clickSound.play();
        setChangeMoveMode((s) => !s)
        if (moves === 0) setXMove((s) => !s)
    }
     const changeView = () => {
        if (soundOn) clickSound.play();
        setViewBoard((s) => (s + 1) % 3)
     }

    const startMoveText = changeMoveMode ? 'Начинает игру О' : 'Начинает игру Х'
    const Options = () => {
        return (
            <div className='optionsMode'>
                <button className="optionsBtn" onClick={changeStartMove}>{startMoveText}</button>
                <button className="optionsBtn" onClick={changeView}>Вид поля ({viewBoard + 1})</button>
                <button className="optionsBtn" onClick={() => {}}>Empty too</button>
            </div>
        )
    }


    return (
        <div className='wrapp'>
            <MusicPlayer name='Volume of music' soundOn={soundOn} clickSound={clickSound}  />
            <SoundPlayer name='Volume of sounds' soundOnOff={soundOnOff} soundOn={soundOn} clickSound={clickSound} />
            { Options() }
            { fullScreenMode() }
            { newGame }
            <Board onCellClick={onCellClick} board={board} viewBoard={viewBoard}/>
            { infoGame }
            <Footer />
        </div>
    )
}
