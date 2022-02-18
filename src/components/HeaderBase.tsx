import linkedinLogo from '../assets/images/linkedin.svg'
import facebookLogo from '../assets/images/facebook.svg'
import discordLogo from '../assets/images/discord.svg'
import balleriniDevsLogo from '../assets/images/logo.svg'

import '../styles/components/headerbase.scss'
import { Link } from "react-router-dom";

import { HeaderBaseProps } from "../types/components/headerbase";

export function HeaderBase({ children }: HeaderBaseProps) {
    return (
        <header id="header-base">
            <div className="social-container">
                <a href="https://www.linkedin.com/company/comunidadeballerini/" target="_blank" rel="noreferrer">
                    <img src={linkedinLogo} alt="linkedin logo" />
                </a>
                <a href="https://www.facebook.com/rafaella.balleriniribeirogomes" target="_blank" rel="noreferrer">
                    <img src={facebookLogo} alt="facebook logo" />
                </a>
                <a href="https://discord.gg/wagxzStdcR" target="_blank" rel="noreferrer">
                    <img src={discordLogo} alt="discord logo" />
                </a>
            </div>
            <div className="title-container">
                <img src={balleriniDevsLogo} alt="ballerini devs logo" />
                <h1><Link to='/'>Ballerini Devs</Link></h1>
                <div className="void"></div>
            </div>
            {children}
        </header>
    )
}