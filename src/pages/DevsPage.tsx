import { Fragment, useEffect, useState } from "react";
import ReactModal from "react-modal";

import { collection, onSnapshot, query } from "firebase/firestore";
import { database, storage } from "../services/firebase";
import { getDownloadURL, ref } from "firebase/storage";

import searchIcon from '../assets/images/search-icon.svg'

import '../styles/pages/devspage.scss'
import '../styles/components/devsmodal.scss'
import 'swiper/css'
import 'swiper/css/navigation'

import { DevCard } from "../components/DevCard";
import { Button } from "../components/Button";
import { HeaderBase } from "../components/HeaderBase";
import { DevsModal } from "../components/DevsModal";
import { DeleteDevModal } from "../components/DeleteDevModal";
import Swiper, { Navigation } from 'swiper';

import { DevsInPageType, EachDevInPageDataType } from "../types/devspage";
import { useDevsPage } from "../hooks/useDevsPage";
import { DevInfoModal } from "../components/DevInfoModal";

export function DevsPage() {
    const { stateIsDevsModalOpen, stateIsDevsModalToEdit,
        stateIsDeleteModalOpen, stateDevToHandleId,
        stateIsDevInfoModalOpen, stateDevInfo } = useDevsPage()

    const [isDevsModalOpen, setIsDevsModalOpen] = stateIsDevsModalOpen
    const [isDevsModalToEdit, setIsDevsModalToEdit] = stateIsDevsModalToEdit

    const [isDeleteModalOpen] = stateIsDeleteModalOpen
    const [devToHandleId] = stateDevToHandleId

    const [devInfo] = stateDevInfo
    const [isDevInfoModalOpen] = stateIsDevInfoModalOpen

    const [devsInPage, setDevsInPage] = useState([] as DevsInPageType[])
    const [searchDev, setSearchDev] = useState('')

    new Swiper('.swiper', {
        modules: [Navigation],
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        allowTouchMove: false,
        spaceBetween: 50
    });

    useEffect(() => {
        const queryResult = query(collection(database, 'devs'))

        const unsubscribe = onSnapshot(queryResult, snapResult => {
            setDevsInPage([] as DevsInPageType[])

            snapResult.docs.forEach(async doc => {
                await getDownloadURL(ref(storage, `photos/${doc.id}`)).then(photo => {
                    const devData = doc.data() as EachDevInPageDataType
                    const devInPage: DevsInPageType = {
                        devData: devData,
                        devId: doc.id,
                        photoURL: photo
                    }

                    setDevsInPage(prevDevs => [...prevDevs, devInPage])
                })
            })
        })

        return () => {
            unsubscribe()
        }

    }, [setDevsInPage])

    ReactModal.setAppElement('#root')

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
                <div className='add-dev-container'>
                    <Button type="button" onClick={() => {
                        setIsDevsModalOpen(true)
                        setIsDevsModalToEdit(false)
                    }}>
                        Adicionar desenvolvedor
                    </Button>
                </div>
            </HeaderBase>
            <div className="cards-container">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {devsInPage.map(dev => {
                            if (dev.devData.name.toLocaleLowerCase().includes(searchDev.toLocaleLowerCase()) || searchDev === '') {
                                return (
                                    <div key={dev.devId} className="swiper-slide">
                                        <DevCard devId={dev.devId} photoURL={dev.photoURL} devData={dev.devData} />
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                    <div className="swiper-button-prev swiper-button" id="slide-prev">
                        <button type='button'></button>
                    </div>
                    <div className="swiper-button-next swiper-button" id="slide-next">
                        <button type='button'></button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}