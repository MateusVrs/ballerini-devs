import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../../services/firebase";

import { DevsModalContextType } from "../../types/pages/devspage";

import { v4 as uuidv4 } from 'uuid';

type handleDevsAttrs = {
    devId: string | null,
    isEditModal: boolean,
    devContextValue: DevsModalContextType
}

export async function handleDevs({ devContextValue, devId, isEditModal }: handleDevsAttrs) {
    const { stateDevInfo } = devContextValue
    const [devInfo] = stateDevInfo

    if (isEditModal) {
        const photo = devInfo.photo as File
        const fileName = photo?.name

        if (fileName) {
            const newFileRef = ref(storage, `photos/${devId}`)
            await uploadBytes(newFileRef, photo).then(async () => {
                await updateDoc(doc(database, `devs/${devId}`), { ...devInfo, photo: `${devId}` })
            })
        } else {
            await updateDoc(doc(database, `devs/${devId}`), { ...devInfo, photo: `${devId}` })
        }
    } else {
        const uuid = uuidv4()

        const photo = devInfo.photo as File
        const newFileRef = ref(storage, `photos/${uuid}`)

        await uploadBytes(newFileRef, photo).then(async () => {
            await setDoc(doc(database, 'devs', `${uuid}`), { ...devInfo, photo: `${uuid}` })
        })
    }
}
