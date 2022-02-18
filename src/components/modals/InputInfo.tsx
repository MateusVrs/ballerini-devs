import { useDevsPage } from "../../hooks/useDevsPage";
import { DevInfoType } from "../../types/components/devsmodal";

type InputInfoProps = {
    infoType: string
    infoLabel: string
}

export function InputInfo({ infoType, infoLabel }: InputInfoProps) {
    const { stateDevInfo } = useDevsPage()
    const [devInfo, setDevInfo] = stateDevInfo

    return (
        <div className="input-container">
            <label htmlFor={infoType}>{infoLabel}:</label>
            <input type="text" id={infoType} name={infoType}
                value={devInfo[infoType as keyof DevInfoType] ? devInfo[infoType as keyof DevInfoType] as string : ''}
                onChange={(event) => setDevInfo({ ...devInfo, [infoType]: event.target.value })} />
        </div>
    )
}