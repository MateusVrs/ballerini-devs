import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../../services/firebase";

import { FormEvent } from "react";
import toast from "react-hot-toast";

import { DevsModalContextType } from "../../types/devspage";
import { DevInfoType } from "../../types/devsmodal";

import { devInfoDefault } from "../../contexts/DevsModalContext";

import { v4 as uuidv4 } from 'uuid';

type handleDevsAttrs = {
    event: FormEvent,
    devId: string | null,
    isEditModal: boolean,
    devContextValue: DevsModalContextType
}

export async function handleDevs({ devContextValue, devId, event, isEditModal }: handleDevsAttrs) {
    const { stateDevInfo, stateIsDevsModalOpen } = devContextValue
    const [devInfo, setDevInfo] = stateDevInfo
    const [, setIsDevsModalOpen] = stateIsDevsModalOpen

    var enableAddDev = true
    event.preventDefault()
    Object.keys(devInfo).find((key) => {
        if (!devInfo[key as keyof DevInfoType]) {
            if (key === 'name' || key === 'role' || key === 'avatar') {
                enableAddDev = false
                return toast.error('Complete todas as informações')
            }
        }
        return null
    })
    
    if (isEditModal) {
        const photo = devInfo.photo as File
        const fileName = photo?.name

        if (fileName) {
            const newFileRef = ref(storage, `photos/${devId}`)
            await uploadBytes(newFileRef, photo).then(async () => {
                await updateDoc(doc(database, `devs/${devId}`), { ...devInfo, photo: `${devId}` }).then(() => {
                    setIsDevsModalOpen(false)
                    setDevInfo(devInfoDefault)
                })
            })
        } else {
            await updateDoc(doc(database, `devs/${devId}`), { ...devInfo, photo: `${devId}` }).then(() => {
                setIsDevsModalOpen(false)
                setDevInfo(devInfoDefault)
            })
        }
    } else {
        if (enableAddDev) {
            const uuid = uuidv4()

            const photo = devInfo.photo as File
            const newFileRef = ref(storage, `photos/${uuid}`)

            await uploadBytes(newFileRef, photo).then(async () => {
                await setDoc(doc(database, 'devs', `${uuid}`), { ...devInfo, photo: `${uuid}` }).then(() => {
                    setIsDevsModalOpen(false)
                    setDevInfo(devInfoDefault)
                })
            })
        }
    }
}
