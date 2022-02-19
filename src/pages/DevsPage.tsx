import { Fragment, useEffect, useState } from "react";
import { useDevsPage } from "../hooks/useDevsPage";
import { useAuth } from "../hooks/useAuth";

import { collection, DocumentData, onSnapshot, query, QueryDocumentSnapshot } from "firebase/firestore";
import { database, storage } from "../services/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { supabase } from "../services/supabse";

import searchIcon from '../assets/images/search-icon.svg'
import githubLogo from '../assets/images/github.svg'

import '../styles/pages/devspage.scss'
import '../styles/components/devsmodal.scss'
import 'swiper/css'
import 'swiper/css/navigation'

import { DevCard } from "../components/DevCard";
import { Button } from "../components/Button";
import { HeaderBase } from "../components/HeaderBase";
import { DevsModal } from "../components/modals/DevsModal";
import { DeleteDevModal } from "../components/modals/DeleteDevModal";
import { DevInfoModal } from "../components/modals/DevInfoModal";
import Swiper, { Navigation } from 'swiper';

import { DevsInPageType, EachDevInPageDataType } from "../types/pages/devspage"
import { LoadingCircle } from "../components/LoadingCircle";

export function DevsPage() {
    const { user, signInWithGithub } = useAuth()

    const { stateIsDevsModalOpen, stateIsDevsModalToEdit,
        stateIsDeleteModalOpen, stateDevToHandleId,
        stateIsDevInfoModalOpen, stateDevInfo } = useDevsPage()

    const [didLoad, setDidLoad] = useState(false)

    const [isDevsModalOpen, setIsDevsModalOpen] = stateIsDevsModalOpen
    const [isDevsModalToEdit, setIsDevsModalToEdit] = stateIsDevsModalToEdit

    const [isDeleteModalOpen] = stateIsDeleteModalOpen
    const [devToHandleId] = stateDevToHandleId

    const [devInfo, setDevInfo] = stateDevInfo
    const [isDevInfoModalOpen] = stateIsDevInfoModalOpen

    const [devsInPage, setDevsInPage] = useState([] as DevsInPageType[])
    const [searchDev, setSearchDev] = useState('')

    new Swiper('.swiper', {
        modules: [Navigation],
        slidesPerView: 1,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 50,
        preloadImages: true,
        centerInsufficientSlides: true
    })

    async function getDevPhoto(document: QueryDocumentSnapshot<DocumentData>, devData: EachDevInPageDataType) {
        var devInPage: DevsInPageType = {}
        await getDownloadURL(ref(storage, `photos/${document.id}`)).then(photo => {
            devInPage = {
                [document.id]: {
                    devData: devData,
                    devId: document.id,
                    photoURL: photo
                }
            }
        })
        return devInPage
    }

    useEffect(() => {
        const queryResult = query(collection(database, 'devs'))

        const unsubscribe = onSnapshot(queryResult, snapResult => {
            snapResult.docChanges().forEach(async docChange => {
                const document = docChange.doc
                const devData = document.data() as EachDevInPageDataType

                if (docChange.type === 'added') {
                    await getDevPhoto(document, devData).then(newDev => {
                        setDevsInPage(prevDevs => [...prevDevs, newDev])
                    })
                } else if (docChange.type === 'removed') {
                    setDevsInPage(prevDevs => prevDevs.filter(devObject => Object.keys(devObject)[0] !== document.id))
                } else if (docChange.type === 'modified') {
                    await getDevPhoto(document, devData).then(newDev => {
                        setDevsInPage(prevDevs => [...prevDevs.filter(devObject => Object.keys(devObject)[0] !== document.id), newDev])
                    })
                }
                setDidLoad(true)
            })
            if (snapResult.docChanges().length === 0) {
                setDidLoad(true)
            }
        })

        return () => {
            unsubscribe()
        }

    }, [setDevsInPage, setIsDevsModalOpen, setIsDevsModalToEdit, setDevInfo])

    return (
        <Fragment>
            <DevInfoModal isModalOpen={isDevInfoModalOpen} devInfo={devInfo} />
            <DevsModal isModalOpen={isDevsModalOpen} isEditModal={isDevsModalToEdit} devId={devToHandleId} />
            <DeleteDevModal isModalOpen={isDeleteModalOpen} devInfo={devToHandleId} />
            <HeaderBase>
                <div className="search-container">
                    <img className='search-icon' src={searchIcon} alt="search icon" />
                    <input type="text" placeholder="Buscar"
                        value={searchDev}
                        onChange={event => { setSearchDev(event.target.value) }}
                    />
                </div>
                <div className="buttons-container">
                    {user ? (
                        <Button type="button" onClick={() => supabase.auth.signOut()}>
                            Log out
                        </Button>
                    ) : (
                        <Button className="github-button" type="button" onClick={async () => signInWithGithub('devs')}>
                            <img src={githubLogo} alt="github logo" />
                            Crie seu perfil
                        </Button>
                    )}
                </div>
            </HeaderBase>
            <div className="cards-container">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {didLoad ? devsInPage.map((dev: DevsInPageType) => {
                            const data = Object.entries(dev)[0][1]
                            if (data.devData.name.toLocaleLowerCase().includes(searchDev.toLocaleLowerCase()) || searchDev === '') {
                                return <DevCard key={data.devId} devId={data.devId} photoURL={data.photoURL} devData={data.devData} />
                            } else {
                                return null
                            }
                        }) : <div className="swiper-slide" style={{ width: '90vw' }}><LoadingCircle /></div>}
                    </div>
                </div>
                <div className="swiper-button-prev swiper-button" id="slide-prev">
                    <button type='button'></button>
                </div>
                <div className="swiper-button-next swiper-button" id="slide-next">
                    <button type='button'></button>
                </div>
            </div>
        </Fragment>
    )
}
