import React, { useState, useEffect } from 'react'
import Board from '../Board'
import Footer from '../Footer'
import SoundPlayer from '../SoundPlayer'
import MusicPlayer from '../MusicPlayer'
import Clock from '../Clock'
import Statistics from '../Statistics'
import click from '../../assets/click.mp3'
import './Game.css'

export default function Game() {
    const [xMove, setXMove] = useState(localStorage.getItem('xMove') ? JSON.parse(localStorage.getItem('xMove')) : true)
    const [board, setBoard] = useState(localStorage.getItem('board') ? JSON.parse(localStorage.getItem('board')) : Array(9).fill(''))
    const [moves, setMoves] = useState(localStorage.getItem('moves') ? JSON.parse(localStorage.getItem('moves')) : 0)
    const [changeMoveMode, setChangeMoveMode] = useState(localStorage.getItem('changeMoveMode') ? JSON.parse(localStorage.getItem('changeMoveMode')) : false)
    const [viewBoard, setViewBoard] = useState(localStorage.getItem('viewBoard') ? JSON.parse(localStorage.getItem('viewBoard')) : 0)
    const [soundOn, setSoundOn] = useState(localStorage.getItem('soundOn') ? JSON.parse(localStorage.getItem('soundOn')) : true)
    const [xWins, setXWins] = useState(localStorage.getItem('oWins') ? JSON.parse(localStorage.getItem('xWins')) : 0)
    const [oWins, setOWins] = useState(localStorage.getItem('xWins') ? JSON.parse(localStorage.getItem('oWins')) : 0)
    const [sec, setSec] = useState(localStorage.getItem('sec') ? JSON.parse(localStorage.getItem('sec')) : 0)
    const [min, setMin] = useState(localStorage.getItem('min') ? JSON.parse(localStorage.getItem('min')) : 0)
    const [staticON, setStaticON] = useState(localStorage.getItem('staticON') ? JSON.parse(localStorage.getItem('staticON')) : false)
    const [arrStat, setArrStat] = useState(localStorage.getItem('arrStat') ? JSON.parse(localStorage.getItem('arrStat')) : [])

    const funcSetSec = () => {
        setSec((s) => (s + 1))
    }
    const funcSetMin = () => {
        setMin(sec / 60)
    }
    const clear = () => {
        localStorage.removeItem('sec');
        localStorage.removeItem('min');
        setMin(0)
        setSec(0)
    }

    const clickSound = new Audio(click)

    const soundOnOff = (s) => {
        setSoundOn(s)
        localStorage.setItem('soundOn', JSON.stringify(s));
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
        localStorage.setItem('board', JSON.stringify(boardChange))
        localStorage.setItem('xMove', JSON.stringify(!xMove))
        localStorage.setItem('moves', JSON.stringify(moves + 1))
        setXMove((s) => !s)
        setMoves((s) => s + 1)

        if (win(boardChange) === 'X') {
            setXWins((s) => s + 1)
        }
        if (win(boardChange) === 'O') {
            setOWins((s) => s + 1)
        }
        if(win(boardChange)) {
            const newArr = [win(boardChange) ,moves + 1, min, sec]

            setArrStat((s) => [...s, newArr].sort((a, b) => a[3] - b[3]).filter((item, i) => i <= 9))
        }
    }

    useEffect(() => {
        localStorage.setItem('oWins', JSON.stringify(oWins))
        localStorage.setItem('xWins', JSON.stringify(xWins))
      }, [oWins, xWins])

    useEffect(() => {
        localStorage.setItem('arrStat', JSON.stringify(arrStat))
    }, [arrStat])

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
        localStorage.setItem('board', JSON.stringify(Array(9).fill('')))
        setMoves(0)
        localStorage.setItem('moves', JSON.stringify(0))
        changeMoveMode ? localStorage.setItem('xMove', JSON.stringify(false)) : localStorage.setItem('xMove', JSON.stringify(true))
        changeMoveMode ? setXMove(false) : setXMove(true)
        clear()
    }

    const newGame = <button className="startBtn" onClick={playNewGame}> Начать новую игру </button>

    const infoGameText = isWinner ? `Победил ${isWinner}` :
        (moves === 9 && !isWinner) ? `Ничья` :
        `Сейчас ходит ${ xMove ? 'X' : 'O'}`

    const opensStatistic = () => {
        setStaticON((s) => !s)
    }

    const infoGame = <div>
        <div className="infoGame">{infoGameText}</div>
        <div className="infoGame"> Ходы: {moves}</div>
        <div className="infoGame">Время на ход:</div>
        <div className="infoGame">Общее время игры: <Clock funcSetSec={funcSetSec}
        funcSetMin={funcSetMin} sec={sec} min={min} clear={clear} /></div>
        <div className="infoGame">X победил: {xWins} раз</div>
        <div className="infoGame">О победил: {oWins} раз</div>
        <button className="fullScreenBtn" onClick={opensStatistic} >Статистика</button>
        { staticON ? <Statistics arrStat={arrStat} /> : null}
    </div>

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
        localStorage.setItem('changeMoveMode', JSON.stringify(!changeMoveMode))
        setChangeMoveMode((s) => !s)
        if (moves === 0) {
            localStorage.setItem('xMove', JSON.stringify(!xMove))
            setXMove((s) => !s)
        }
    }
     const changeView = () => {
        if (soundOn) clickSound.play();
        localStorage.setItem('viewBoard', JSON.stringify((viewBoard +1) % 3))
        setViewBoard((s) => (s + 1) % 3)
     }

    const startMoveText = changeMoveMode ? 'Начинает игру О' : 'Начинает игру Х'
    const Options = () => {
        return (
            <div className='optionsMode'>
                <button className="optionsBtn" onClick={changeStartMove}>{startMoveText}</button>
                <button className="optionsBtn" onClick={changeView}>Вид поля ({viewBoard + 1})</button>
                <button className="optionsBtn" onClick={() => {}}>Empty</button>
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
