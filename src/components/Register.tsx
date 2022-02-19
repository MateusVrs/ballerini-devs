import { Fragment } from "react";
import { Button } from "./Button";

import githubLogo from '../assets/images/github.svg'
import blackBlobImg from '../assets/images/black-blob.svg'
import greenBlobImg from '../assets/images/green-blob.svg'
import justProgrammerImg from '../assets/images/just-programmer.svg'

import '../styles/components/register.scss'

import { useAuth } from "../hooks/useAuth";
import { signInAnonymouslySupabase } from "../contexts/AuthContext";

export function Register() {
    const { signInWithGithub, user } = useAuth()

    async function handleSign() {
        if (!user) {
            await signInWithGithub('chat')
        }
    }

    return (
        <Fragment>
            <div className="blobs-container">
                <img src={blackBlobImg} alt="black blob" className="blobs black-blob" />
                <img src={greenBlobImg} alt="green blob" className="blobs green-blob" />
            </div>
            <section className="register-container">
                <div className="content-container">
                    <h2>Seja bem vindo ao nosso chat!</h2>
                    <span>Cadastre-se com</span>
                    <div className="buttons-content">
                        <Button type="button" className='github-btn' onClick={handleSign}>
                            <img src={githubLogo} alt="" />
                            <span>GitHub</span>
                        </Button>
                        <div className="buttons-divisor">
                            <div className="line"></div>
                            <span>ou entre</span>
                            <div className="line"></div>
                        </div>
                        <Button type="button" className='anonymous-btn' onClick={() => signInAnonymouslySupabase()}>
                            <div><span>?</span></div>
                            <span>Anônimo</span>
                        </Button>
                    </div>
                </div>
                <div className="img-container">
                    <img src={justProgrammerImg} alt="programmer" />
                </div>
            </section>
        </Fragment>
    )
}