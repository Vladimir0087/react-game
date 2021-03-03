import React, { useState, useEffect, useCallback, useRef } from 'react'
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
    const [musicSong, setMusicSong] = useState(localStorage.getItem('musicSong') ? JSON.parse(localStorage.getItem('musicSong')) : 0)
    const [soundOn, setSoundOn] = useState(localStorage.getItem('soundOn') ? JSON.parse(localStorage.getItem('soundOn')) : true)
    const [xWins, setXWins] = useState(localStorage.getItem('oWins') ? JSON.parse(localStorage.getItem('xWins')) : 0)
    const [oWins, setOWins] = useState(localStorage.getItem('xWins') ? JSON.parse(localStorage.getItem('oWins')) : 0)
    const [sec, setSec] = useState(localStorage.getItem('sec') ? JSON.parse(localStorage.getItem('sec')) : 0)
    const [min, setMin] = useState(localStorage.getItem('min') ? JSON.parse(localStorage.getItem('min')) : 0)
    const [staticON, setStaticON] = useState(localStorage.getItem('staticON') ? JSON.parse(localStorage.getItem('staticON')) : false)
    const [hotKey, setHotKey] = useState(localStorage.getItem('hotKey') ? JSON.parse(localStorage.getItem('hotKey')) : false)
    const [arrStat, setArrStat] = useState(localStorage.getItem('arrStat') ? JSON.parse(localStorage.getItem('arrStat')) : [])
    const [timeOn, setTimeOn] = useState(localStorage.getItem('timeOn') ? JSON.parse(localStorage.getItem('timeOn')) : false)
    const [winPos, setWinPos] = useState(localStorage.getItem('winPos') ? JSON.parse(localStorage.getItem('winPos')) : [])
    const [autoPlayOn, setAutoPlayOn] = useState(localStorage.getItem('autoPlayOn') ? JSON.parse(localStorage.getItem('autoPlayOn')) : false)
    const [computerOn, setComputerOn] = useState(localStorage.getItem('computerOn') ? JSON.parse(localStorage.getItem('computerOn')) : false)

    const funcSetSec = useCallback(() => {
        setSec((s) => (s + 1))
    }, [])

    const funcSetMin = () => {
        setMin(sec / 60)
    }
    const clear = () => {
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
                if(!winPos.length) setWinPos([a, b, c])
                return data[a]
            }
        }
        return ''
    }

    const isWinner = win(board)

    const onCellClick = (ind) => {
        const boardChange = [...board]
        if (boardChange[ind] || isWinner) return
        setXMove((s) => !s)
        if(!timeOn) setTimeOn(true)
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
        // setXMove((s) => !s)
        if(moves + 1 === 9 && !isWinner) setTimeOn(false)
        setMoves((s) => s + 1)

        if (win(boardChange) === 'X') setXWins((s) => s + 1)
        if (win(boardChange) === 'O') setOWins((s) => s + 1)
        if(win(boardChange)) {
            const newArr = [win(boardChange) ,moves + 1, min, sec]
            setTimeOn(false)
            setAutoPlayOn(false)
            setArrStat((s) => [...s, newArr].sort((a, b) => {
            if (a[3] === b[3]) {
                return a[1] - b[1]
            }
            return a[3] - b[3]})
            .filter((item, i) => i <= 9))
        }
    }

    useEffect(() => {
        if(winPos.length)
        winPos.forEach(element => {
            let el = document.getElementById(element)
            el.classList.add('winCells')
        })
        localStorage.setItem('winPos', JSON.stringify(winPos))
      }, [winPos, viewBoard])
    useEffect(() => {
        localStorage.setItem('oWins', JSON.stringify(oWins))
        localStorage.setItem('xWins', JSON.stringify(xWins))
      }, [oWins, xWins])
    useEffect(() => localStorage.setItem('arrStat', JSON.stringify(arrStat)), [arrStat])
    useEffect(() => localStorage.setItem('musicSong', JSON.stringify(musicSong)), [musicSong])

    const playNewGame = () => {
        if (soundOn) clickSound.play();
        setBoard(Array(9).fill(''))
        setTimeOn(true)
        localStorage.setItem('board', JSON.stringify(Array(9).fill('')))
        setMoves(0)
        localStorage.setItem('moves', JSON.stringify(0))
        changeMoveMode ? localStorage.setItem('xMove', JSON.stringify(false)) : localStorage.setItem('xMove', JSON.stringify(true))
        changeMoveMode ? setXMove(false) : setXMove(true)
        clear()
        setWinPos([])
        setAutoPlayOn(false)
    }

    const newGame = <button className="startBtn" onClick={playNewGame}> Начать новую игру </button>
    const infoGameText = isWinner ? `Победил ${isWinner}` :
        (moves === 9 && !isWinner) ? `Ничья` :
        `Сейчас ходит ${ xMove ? 'X' : 'O'}`
    const opensStatistic = () => {
        if (soundOn) clickSound.play();
        setStaticON((s) => !s)
    }
    useEffect(() => localStorage.setItem('staticON', JSON.stringify(staticON)), [staticON])
    const clearStatistics = () => {
        if (soundOn) clickSound.play();
        setArrStat([])
        setXWins(0)
        setOWins(0)
    }
    const hotKeys = <div className="hotkeys">
        <p>цифра 1 - крестик/нолик низ лево</p>
        <p>цифра 2 - крестик/нолик низ центр</p>
        <p>цифра 3 - крестик/нолик низ право</p>
        <p>цифра 4 - крестик/нолик центр лево</p>
        <p>цифра 5 - крестик/нолик центр центр</p>
        <p>цифра 6 - крестик/нолик центр право</p>
        <p>цифра 7 - крестик/нолик верх лево</p>
        <p>цифра 8 - крестик/нолик верх центр</p>
        <p>цифра 9 - крестик/нолик верх право</p>
    </div>
    const openHotkeys = () => {
        if (soundOn) clickSound.play();
        setHotKey((s) => !s)
    }
    useEffect(() => localStorage.setItem('hotKey', JSON.stringify(hotKey)), [hotKey])

    const infoGame = <div>
        <button className="fullScreenBtn" onClick={openHotkeys} >Горячие клавиши</button>
        {hotKey ? <div className="infoGame">{hotKeys}</div> : null}
        <div className="infoGame">{infoGameText}</div>
        <div className="infoGame"> Ходы: {moves}</div>
        <div className="infoGame">Общее время игры: <Clock funcSetSec={funcSetSec}
        funcSetMin={funcSetMin} sec={sec} min={min} timeOn={timeOn} /></div>
        <div className="infoGame">X победил: {xWins} раз</div>
        <div className="infoGame">О победил: {oWins} раз</div>
        <button className="fullScreenBtn" onClick={opensStatistic} >Статистика</button>
        <button className="fullScreenBtn" onClick={clearStatistics} >Очистить статистику</button>
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
     const changeMusic = () => {
        if (soundOn) clickSound.play();
        setMusicSong((s) => (s + 1) % 3)
     }
    const startMoveText = changeMoveMode ? 'Начинает игру О' : 'Начинает игру Х'
    const Options = () => {
        return (
            <div className='optionsMode'>
                <button className="optionsBtn" onClick={changeStartMove}>{startMoveText}</button>
                <button className="optionsBtn" onClick={changeView}>Вид поля ({viewBoard + 1})</button>
                <button className="optionsBtn" onClick={changeMusic}>Музыка ({musicSong + 1})</button>
            </div>
        )
    }

    useEffect(() => {localStorage.setItem('timeOn', JSON.stringify(timeOn))}, [timeOn])

    const cellRef1 = useRef(null)
    const cellRef2 = useRef(null)
    const cellRef3 = useRef(null)
    const cellRef4 = useRef(null)
    const cellRef5 = useRef(null)
    const cellRef6 = useRef(null)
    const cellRef7 = useRef(null)
    const cellRef8 = useRef(null)
    const cellRef9 = useRef(null)
    const arrRef = [cellRef1, cellRef2, cellRef3, cellRef4, cellRef5, cellRef6, cellRef7, cellRef8, cellRef9]
    document.addEventListener('keydown', function(e) {
        if (e.key === '1' && cellRef7.current) cellRef7.current.click()
        if (e.key === '2' && cellRef8.current) cellRef8.current.click()
        if (e.key === '3' && cellRef9.current) cellRef9.current.click()
        if (e.key === '4' && cellRef4.current) cellRef4.current.click()
        if (e.key === '5' && cellRef5.current) cellRef5.current.click()
        if (e.key === '6' && cellRef6.current) cellRef6.current.click()
        if (e.key === '7' && cellRef1.current) cellRef1.current.click()
        if (e.key === '8' && cellRef2.current) cellRef2.current.click()
        if (e.key === '9' && cellRef3.current) cellRef3.current.click()
    })

    const autoMove = useCallback(() => {
        const getRandomValue = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const getEmptyCells = (data) => data.map((val, i) => [val, i]).filter(el => el[0] === "")
        const findRandomMove = (data) => {
            const emptyCells = getEmptyCells(data)
            if (emptyCells.length > 0) {
              const randomValue = getRandomValue(0, emptyCells.length - 1)
              const index = emptyCells[randomValue][1]
              return index
            }
            return null
        }
        const autoIndex = findRandomMove(board)
        if (autoIndex === 0 && cellRef1.current) cellRef1.current.click()
        if (autoIndex === 1 && cellRef2.current) cellRef2.current.click()
        if (autoIndex === 2 && cellRef3.current) cellRef3.current.click()
        if (autoIndex === 3 && cellRef4.current) cellRef4.current.click()
        if (autoIndex === 4 && cellRef5.current) cellRef5.current.click()
        if (autoIndex === 5 && cellRef6.current) cellRef6.current.click()
        if (autoIndex === 6 && cellRef7.current) cellRef7.current.click()
        if (autoIndex === 7 && cellRef8.current) cellRef8.current.click()
        if (autoIndex === 8 && cellRef9.current) cellRef9.current.click()
    }, [board])

    const autoPlay = () => {
        if (soundOn) clickSound.play()
        playNewGame()
        setComputerOn(false)
        setAutoPlayOn((s) => !s)
    }
    useEffect(() => {localStorage.setItem('autoPlayOn', JSON.stringify(autoPlayOn))}, [autoPlayOn])

    useEffect(() => {
        let intervalID = null
        if(autoPlayOn && moves < 9) {
            intervalID = setInterval(() => autoMove(), 300)
        }
        return () => clearInterval(intervalID)
    }, [autoMove, autoPlayOn, moves])

    const computerPlay = () => {
        if (soundOn) clickSound.play()
        setAutoPlayOn(false)
        setComputerOn((s) => !s)
    }
    useEffect(() => {
        let timerId
        if(computerOn && !xMove && moves < 9) timerId = setTimeout(() => autoMove(), 300)
        return () => clearTimeout(timerId)
    }, [autoMove, computerOn, xMove, moves])
    useEffect(() => {localStorage.setItem('computerOn', JSON.stringify(computerOn))}, [computerOn])

    const autoPlayClass = autoPlayOn ? 'autoplayOn' : 'autoplayOff'
    const compOn = computerOn ? 'compOn' : 'compOff'

    return (
        <div className='wrapp'>
            <MusicPlayer name='Volume of music' soundOn={soundOn} clickSound={clickSound} musicSong={musicSong} />
            <SoundPlayer name='Volume of sounds' soundOnOff={soundOnOff} soundOn={soundOn} clickSound={clickSound} />
            { Options() }
            { fullScreenMode() }
            { newGame }
            <div className='autoPlay'>
                <button className={autoPlayClass} onClick={autoPlay}>Автоигра</button>
                <button className={compOn} onClick={computerPlay}>Играть с компьютером</button>
            </div>
            <Board onCellClick={onCellClick} board={board} viewBoard={viewBoard} arrRef={arrRef} />
            { infoGame }
            <Footer />
        </div>
    )
}
