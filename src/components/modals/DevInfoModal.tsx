import devLinkedinImg from '../../assets/images/dev-linkedin.png'
import devGithubImg from '../../assets/images/dev-github.png'

import { DevInfoModalProps } from "../../types/components/devinfomodal";

import { isValidHttpUrl } from '../functions/isValidHttpUrl';
import { devInfoDefault } from '../../contexts/DevsModalContext';
import { useDevsPage } from '../../hooks/useDevsPage';

import '../../styles/components/devinfomodal.scss'

import { Button } from "../Button";
import { Modal } from '../Modal';
import { Fragment } from 'react';

export function DevInfoModal({ isModalOpen, devInfo }: DevInfoModalProps) {
    const { stateDevInfo } = useDevsPage()
    const [, setDevInfo] = stateDevInfo

    const { stateIsDevInfoModalOpen } = useDevsPage()
    const [, setIsDevInfoModalOpen] = stateIsDevInfoModalOpen

    return (
        <Modal isModalOpen={isModalOpen} >
            <div className="modal-container">
                <div>
                    <h1>{devInfo.name}</h1>
                    <h2>{devInfo.role}</h2>
                </div>
                <div className="about-container">
                    {devInfo.about && (
                        <Fragment>
                            <h3>Sobre:</h3>
                            <p>{devInfo.about}</p>
                        </Fragment>
                    )}
                    {devInfo.techs && (
                        <Fragment>
                            <h3>Techs:</h3>
                            <ul>
                                {devInfo.techs?.split(',').map((tech, index) => {
                                    return <li key={index}>{tech}</li>
                                })}
                            </ul>
                        </Fragment>
                    )}
                </div>
                <div className="social-container">
                    {isValidHttpUrl(devInfo.githubURL) &&
                        <a href={devInfo.githubURL!} target='_blank' rel="noreferrer">
                            <img src={devGithubImg} alt="github logo" />
                        </a>}
                    {isValidHttpUrl(devInfo.linkedinURL) &&
                        <a href={devInfo.linkedinURL!} target='_blank' rel="noreferrer">
                            <img src={devLinkedinImg} alt="linkedin logo" />
                        </a>}
                </div>
                <div className="buttons-container">
                    <Button type="button" className='close' onClick={() => {
                        setDevInfo(devInfoDefault)
                        setIsDevInfoModalOpen(false)
                    }}>fechar</Button>
                </div>
            </div>
        </Modal>
    )
}