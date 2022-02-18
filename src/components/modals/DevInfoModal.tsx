import devLinkedinImg from '../../assets/images/dev-linkedin.png'
import devGithubImg from '../../assets/images/dev-github.png'

import { Button } from "../Button";

import { DevInfoModalProps } from "../../types/components/devinfomodal";

import { devInfoDefault } from '../../contexts/DevsModalContext';
import { useDevsPage } from '../../hooks/useDevsPage';

import '../../styles/components/devinfomodal.scss'
import { Modal } from '../Modal';

export function DevInfoModal({ isModalOpen, devInfo }: DevInfoModalProps) {
    const { stateDevInfo } = useDevsPage()
    const [, setDevInfo] = stateDevInfo

    const { stateIsDevInfoModalOpen } = useDevsPage()
    const [, setIsDevInfoModalOpen] = stateIsDevInfoModalOpen

    function isValidHttpUrl(string: string | null) {
        let newString = string ? string : ''
        let url;
        try {
            url = new URL(newString);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    return (
        <Modal isModalOpen={isModalOpen} >
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