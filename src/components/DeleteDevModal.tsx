import { deleteDoc, doc } from "firebase/firestore"
import { database, storage } from "../services/firebase"
import { deleteObject, ref } from "firebase/storage"

import { FormEvent } from "react"
import ReactModal from "react-modal"

import { Button } from "./Button"

import { DeleteDevModalProps } from "../types/deletemodal"
import { ReactDeleteModalStyles } from "../styles/components/deletemodal"

import { useDevsPage } from "../hooks/useDevsPage"

export function DeleteDevModal({ isModalOpen, devInfo }: DeleteDevModalProps) {
    const { stateIsDeleteModalOpen, stateDevToHandleId } = useDevsPage()

    const [, setIsDeleteModalOpen] = stateIsDeleteModalOpen
    const [, setDevToHandleId] = stateDevToHandleId

    async function handleDeleteDev(event: FormEvent) {
        event.preventDefault()
        if (devInfo) {
            await deleteDoc(doc(database, `devs/${devInfo}`)).then(() => {
                deleteObject(ref(storage, `photos/${devInfo}`)).then(() => {
                    setIsDeleteModalOpen(false)
                    setDevToHandleId(null)
                })
            })
        }
    }

    return (
        <ReactModal isOpen={isModalOpen} style={ReactDeleteModalStyles}>
            <div className="modal-container">
                <div className="text-container">
                    <h1>deletar desenvolvedor</h1>
                    <p>Tem certeza que deseja deletar este desenvolvedor?</p>
                </div>
                <form onSubmit={handleDeleteDev}>
                    <div className="buttons-container">
                        <Button type='button' className='cancel' onClick={() => setIsDeleteModalOpen(false)}>
                            cancelar
                        </Button>
                        <Button type='submit' className='delete'>
                            deletar
                        </Button>
                    </div>
                </form>
            </div>
        </ReactModal>
    )
}