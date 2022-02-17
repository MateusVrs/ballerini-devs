import { DevInfoType } from "./devsmodal";

export type DevModalFormProps = {
    devInfo: DevInfoType
    setDevInfo: (value: DevInfoType) => void
}