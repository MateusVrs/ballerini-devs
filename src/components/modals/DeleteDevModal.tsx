import { deleteDoc, doc } from "firebase/firestore"
import { auth, database, storage } from "../../services/firebase"
import { signOut } from "firebase/auth"
import { deleteObject, ref } from "firebase/storage"

import { FormEvent, useEffect } from "react"

import { Button } from "../Button"
import { Modal } from "../Modal"
import { LoadingCircle } from "../LoadingCircle"

import { DeleteDevModalProps } from "../../types/components/deletemodal"

import { useDevsPage } from "../../hooks/useDevsPage"
import { useLoading } from "../../hooks/useLoading"

export function DeleteDevModal({ isModalOpen, devInfo }: DeleteDevModalProps) {
    const { isLoading, setIsLoading } = useLoading()
    const { stateIsDeleteModalOpen, stateDevToHandleId } = useDevsPage()

    const [, setIsDeleteModalOpen] = stateIsDeleteModalOpen
    const [, setDevToHandleId] = stateDevToHandleId

    async function handleDeleteDev(event: FormEvent) {
        setIsLoading(true)
        event.preventDefault()
        if (devInfo) {
            await deleteDoc(doc(database, `devs/${devInfo}`)).then(() => {
                deleteObject(ref(storage, `photos/${devInfo}`)).then(() => {
                    setDevToHandleId(null)
                })
            })
        }
    }

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading])

    function handleModalRender() {
        if (isLoading) {
            return <LoadingCircle />
        } else {
            return (
                <div className="modal-container delete-modal">
                    <div className="text-container">
                        <h1>deletar desenvolvedor</h1>
                        <p>Tem certeza que deseja deletar este desenvolvedor?</p>
                    </div>
                    <form onSubmit={(event) => {
                        handleDeleteDev(event).then(() => {
                            setIsDeleteModalOpen(false)
                            setIsLoading(false)
                            signOut(auth).then(() => {
                                window.location.reload()
                            })
                        })
                    }}>
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
            )
        }
    }

    return (
        <Modal isModalOpen={isModalOpen}>
            {handleModalRender()}
        </Modal>
    )
}