import React from 'react'
import logo from '../../assets/rsschool.svg';
import './Footer.css'

export default function Footer() {

    return (
        <div className="footerContainer">
            <span>2021</span>
            <a className="account" href="https://github.com/vladimir0087"
            >Author's GitHub account</a>
            <a className="logoContainer" href="https://rs.school/js/"><img className="logo" src={logo} alt="logo" /></a>
        </div>

    )
}
