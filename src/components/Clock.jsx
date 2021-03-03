import React, { useEffect } from 'react'


export default function Clock ({funcSetSec, funcSetMin, sec, min, timeOn}) {
  useEffect(() => {
      let intervalID = null
    if(timeOn) {
      intervalID = setInterval(() => funcSetSec(), 1000)

    }
      return () => clearInterval(intervalID)
  }, [funcSetSec, timeOn])

  useEffect(() => {
    if(sec % 60 === 0) funcSetMin()
  }, [sec, funcSetMin])

  useEffect(() => {
    localStorage.setItem('sec', JSON.stringify(sec))
    localStorage.setItem('min', JSON.stringify(min))
  }, [sec, min])

    const minutes = (min < 10) ? '0' + min : min

    const seconds = (sec % 60 < 10) ? '0' + sec % 60: sec % 60

  return (
    <div>
      <span> {minutes}:{seconds} </span>
      {/* <button onClick={clear} className="fullScreenBtn">Обнулить данные</button> */}
    </div>
  )
}