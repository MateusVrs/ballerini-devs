import ReactModal from "react-modal";

import { Button } from "./Button";
import { DevModalForm } from "./DevModalForm";
import { Toaster } from "react-hot-toast";

import { handleDevs } from "./functions/handleDevs";

import { DevsModalProps } from "../types/devsmodal";
import { ReactModalStyles } from "../styles/components/devsmodal";
import { useDevsPage } from "../hooks/useDevsPage";

import { devInfoDefault } from "../contexts/DevsModalContext";
import { useEffect } from "react";

export function DevsModal({ isModalOpen, isEditModal, devId = null }: DevsModalProps) {
    const devContextValue = useDevsPage()
    const { stateDevInfo, stateIsDevsModalOpen } = devContextValue

    const [devInfo, setDevInfo] = stateDevInfo
    const [, setIsDevsModalOpen] = stateIsDevsModalOpen

    useEffect(() => {
        if (isModalOpen) {
            setDevInfo({...devInfo, updateDate: new Date().toUTCString()})
        }
    }, [isModalOpen, setDevInfo])

    return (
        <ReactModal isOpen={isModalOpen} style={ReactModalStyles} >
            <Toaster position="top-center" toastOptions={{
                style: {
                    backgroundColor: '#1D1D1D',
                    color: '#fff'
                }
            }} />
            <div className="modal-container">
                <h1>{isEditModal ? 'editar' : 'adicionar'} desenvolvedor</h1>
                <form onSubmit={(event) => {
                    const handleDevsAttrs = {
                        event: event,
                        devId: devId,
                        isEditModal: isEditModal,
                        devContextValue: devContextValue
                    }
                        handleDevs(handleDevsAttrs)
                    }}>
                    <DevModalForm devInfo={devInfo} setDevInfo={setDevInfo} />
                    <div className="buttons-container">
                        <Button className='cancel' onClick={() => {
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
        </ReactModal>
    )
}