import React from 'react'
import './Statistics.css'

export default function Statistics ({arrStat}) {

    return (
        <div className="statistic">
            <div>
                <table className='statWrap'>
                    <thead>
                        <tr>
                            <th>Место</th>
                            <th>Победил</th>
                            <th>Ходы</th>
                            <th>Минуты</th>
                            <th>Секунды</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrStat.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3] % 60}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
