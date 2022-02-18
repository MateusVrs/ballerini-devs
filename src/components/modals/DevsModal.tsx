import { useEffect } from "react";
import { useDevsPage } from "../../hooks/useDevsPage";

import { handleDevs } from "../functions/handleDevs";

import { DevsModalProps } from "../../types/components/devsmodal";

import { devInfoDefault } from "../../contexts/DevsModalContext";

import { Modal } from "../Modal";
import { LoadingCircle } from "../LoadingCircle";
import { Button } from "../Button";
import { Toaster } from "react-hot-toast";
import { DevModalForm } from "./DevModalForm";
import { useLoading } from "../../hooks/useLoading";
import { checkModalInfo } from "../functions/checkModalInfo";

export function DevsModal({ isModalOpen, isEditModal, devId = null }: DevsModalProps) {
    const { isLoading, setIsLoading } = useLoading()
    const devContextValue = useDevsPage()
    const { stateDevInfo, stateIsDevsModalOpen } = devContextValue

    const [devInfo, setDevInfo] = stateDevInfo
    const [, setIsDevsModalOpen] = stateIsDevsModalOpen

    useEffect(() => {
        setIsLoading(false)

        if (isModalOpen) {
            setDevInfo({ ...devInfo, updateDate: new Date().toUTCString() })
        }
    }, [isModalOpen, setDevInfo, setIsLoading])

    function handleModalRender() {
        if (isLoading) {
            return <LoadingCircle />
        } else {
            return (
                <div className="modal-container">
                    <h1>{isEditModal ? 'editar' : 'adicionar'} desenvolvedor</h1>
                    <form onSubmit={(event) => {
                        event.preventDefault()

                        const handleDevsAttrs = {
                            devId: devId,
                            isEditModal: isEditModal,
                            devContextValue: devContextValue
                        }

                        checkModalInfo({devContextValue, event}).then(() => {
                            setIsLoading(true)
                            handleDevs(handleDevsAttrs).then(() => {
                                setDevInfo(devInfoDefault)
                                setIsLoading(false)
                                setIsDevsModalOpen(false)
                            })
                        })
                    }}>
                        <DevModalForm devInfo={devInfo} setDevInfo={setDevInfo} />
                        <div className="buttons-container">
                            <Button type="button" className='cancel' onClick={() => {
                                setIsDevsModalOpen(false)
                                setDevInfo(devInfoDefault)
                            }}>
                                cancelar
                            </Button>
                            <Button type="submit" className={`${isEditModal ? 'edit' : 'add'}`}>
                                {isEditModal ? 'editar' : 'adicionar'}
                            </Button>
                        </div>
                    </form>
                </div>
            )
        }
    }

    return (
        <Modal isModalOpen={isModalOpen}>
            <Toaster position="top-center" toastOptions={{
                style: {
                    backgroundColor: '#1D1D1D',
                    color: '#fff'
                }
            }} />
            {handleModalRender()}
        </Modal>
    )
}