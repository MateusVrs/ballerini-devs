import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import programmerImg from '../assets/images/programmer.svg'
import blackBlobImg from '../assets/images/black-blob.svg'
import greenBlobImg from '../assets/images/green-blob.svg'

import { Button } from "../components/Button";

import '../styles/pages/landingpage.scss'
import { HeaderBase } from "../components/HeaderBase";

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <Fragment>
      <div className="blobs-container">
        <img src={blackBlobImg} alt="black blob" className="blobs black-blob" />
        <img src={greenBlobImg} alt="green blob" className="blobs green-blob" />
      </div>
      <HeaderBase />
      <main id="landingpage-main">
        <div className="text-content">
          <h2>O maior banco de devs do Brasil</h2>
          <p>Não importa se front ou back end, fazer networking é muito importante. Faça parte da maior comunidade de desenvolvedores brasileiros.</p>
          <div className="button-containerr">
            <Button type="button" onClick={() => navigate('/devs')}>Entre agora</Button>
            <div className="button-line"></div>
          </div>
        </div>
        <div className="programmer-container">
          <img src={programmerImg} alt="programmer representation" />
        </div>
      </main>
    </Fragment>
  )
}
