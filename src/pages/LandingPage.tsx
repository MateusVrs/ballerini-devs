import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import linkedinLogo from '../assets/images/linkedin.svg'
import facebookLogo from '../assets/images/facebook.svg'
import discordLogo from '../assets/images/discord.svg'
import programmerImg from '../assets/images/programmer.svg'
import blackBlobImg from '../assets/images/black-blob.svg'
import greenBlobImg from '../assets/images/green-blob.svg'
import balleriniDevsLogo from '../assets/images/logo.svg'

import { Button } from "../components/Button";

import '../styles/pages/landingpage.scss'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <Fragment>
      <header id="landingpage-header">
        <div className="social-container">
          <a href=""><img src={linkedinLogo} alt="linkedin logo" /></a>
          <a href=""><img src={facebookLogo} alt="facebook logo" /></a>
          <a href=""><img src={discordLogo} alt="discord logo" /></a>
        </div>
        <div className="title-container">
          <img src={balleriniDevsLogo} alt="ballerini devs logo" />
          <h1>Ballerini Devs</h1>
          <div className="void"></div>
        </div>
      </header>
      <main id="landingpage-main">
        <div className="blobs-container">
          <img src={blackBlobImg} alt="black blob" className="blobs black-blob" />
          <img src={greenBlobImg} alt="green blob" className="blobs green-blob" />
        </div>
        <section className="info-container">
          <div className="text-content">
            <h2>O maior banco de devs do Brasil</h2>
            <p>Não importa se front ou back end, fazer networking é muito importante. Faça parte da maior comunidade de desenvolvedores brasileiros.</p>
            <div className="button-containerr">
            <Button onClick={() => navigate('/devs')}>Entre agora</Button>
            <div className="button-line"></div>
            </div>
          </div>
          <div className="programmer-container">
            <img src={programmerImg} alt="programmer representation" />
          </div>
        </section>
      </main>
    </Fragment>
  )
}
