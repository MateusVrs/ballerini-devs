import devLinkedinImg from '../assets/images/dev-linkedin.png'
import devGithubImg from '../assets/images/dev-github.png'

import '../styles/components/devcard.scss'

import { useDevsPage } from '../hooks/useDevsPage';

import { Button } from "./Button";
import { Fragment } from 'react';

import { DevCardProps } from '../types/components/devcard';
import { isValidHttpUrl } from './functions/isValidHttpUrl';
import { useAuth } from '../hooks/useAuth';

export function DevCard({ devData, ...props }: DevCardProps) {
    const { user } = useAuth()
    const { stateIsDeleteModalOpen, stateDevInfo, stateDevToHandleId, stateIsDevsModalToEdit, stateIsDevsModalOpen, stateIsDevInfoModalOpen } = useDevsPage()

    const [, setIsDevsModalOpen] = stateIsDevsModalOpen
    const [, setIsDeleteModalOpen] = stateIsDeleteModalOpen
    const [, setIsDevsModalToEdit] = stateIsDevsModalToEdit
    const [, setDevToHandleId] = stateDevToHandleId
    const [, setDevInfo] = stateDevInfo
    const [, setIsDevInfoModalOpen] = stateIsDevInfoModalOpen

    return (
        <Fragment>
            {props.photoURL &&
                <div className="swiper-slide">
                    <section className='card-container'>
                        <div className="card-content">
                            <header>
                                <div className="photo-container">
                                    <div className="content">
                                        <img src={props.photoURL} alt="profile avatar" />
                                    </div>
                                    <div className="image-line"></div>
                                </div>
                                <h1>{devData.name}</h1>
                                <h2>{devData.role}</h2>
                            </header>
                            <main>
                                {isValidHttpUrl(devData.githubURL) && <a href={devData.githubURL}><img src={devGithubImg} alt="github logo" /></a>}
                                {isValidHttpUrl(devData.linkedinURL) && <a href={devData.linkedinURL}><img src={devLinkedinImg} alt="linkedin logo" /></a>}
                                <Button type='button' onClick={() => {
                                    setIsDevInfoModalOpen(true)
                                    setDevInfo(devData)
                                }}>
                                    Ver mais
                                </Button>
                            </main>
                        </div>
                        <footer>
                            {user?.id === props.devId && (
                                <Fragment>
                                    <Button type='button' className='edit' onClick={() => {
                                        setDevInfo({
                                            name: devData.name,
                                            photo: null,
                                            role: devData.role,
                                            githubURL: devData.githubURL,
                                            linkedinURL: devData.linkedinURL,
                                            updateDate: devData.updateDate,
                                            about: devData.about,
                                            techs: devData.techs
                                        })
                                        setDevToHandleId(props.devId)
                                        setIsDevsModalOpen(true)
                                        setIsDevsModalToEdit(true)
                                    }}>
                                        Editar
                                    </Button>
                                    <Button type='button' className='delete' onClick={() => {
                                        setIsDeleteModalOpen(true)
                                        setDevToHandleId(props.devId)
                                    }}>
                                        Deletar
                                    </Button>
                                </Fragment>
                            )}
                        </footer>
                    </section>
                </div>
            }
        </Fragment >
    )
}