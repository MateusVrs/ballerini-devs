import devLinkedinImg from '../assets/images/dev-linkedin.png'
import devGithubImg from '../assets/images/dev-github.png'

import ReactModal from "react-modal";
import { Button } from "./Button";

import { DevInfoModalProps } from "../types/devinfomodal";

import { useDevsPage } from '../hooks/useDevsPage';

import '../styles/components/devinfomodal.scss'
import { ReactModalStyles } from '../styles/components/devsmodal';

export function DevInfoModal({ isModalOpen, devInfo }: DevInfoModalProps) {
    const { stateIsDevInfoModalOpen } = useDevsPage()
    const [, setIsDevInfoModalOpen] = stateIsDevInfoModalOpen

    return (
        <ReactModal isOpen={isModalOpen} style={ReactModalStyles}>
            <div className="modal-container">
                <div>
                    <h1>{devInfo.name}</h1>
                    <h2>{devInfo.role}</h2>
                </div>
                <div className="about-container">
                    <p>{devInfo.about}</p>
                    <ul>
                        {devInfo.techs?.split(',').map((tech, index) => {
                            return <li key={index}>{tech}</li>
                        })}
                    </ul>
                </div>
                <div className="social-container">
                    {devInfo.githubURL &&
                        <a href={devInfo.githubURL} target='_blank' rel="noreferrer">
                            <img src={devGithubImg} alt="github logo" />
                        </a>}
                    {devInfo.linkedinURL &&
                        <a href={devInfo.linkedinURL} target='_blank' rel="noreferrer">
                            <img src={devLinkedinImg} alt="linkedin logo" />
                        </a>}
                </div>
                <div className="buttons-container">
                    <Button type="submit" className='close' onClick={() => setIsDevInfoModalOpen(false)}>fechar</Button>
                </div>
            </div>
        </ReactModal>
    )
}