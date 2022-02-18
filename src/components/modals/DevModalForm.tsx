import { useEffect, useState } from "react";
import { DevModalFormProps } from "../../types/components/devmodalform"

import CreatableSelect from 'react-select/creatable';
import { MultiValue } from "react-select";

export function DevModalForm({ devInfo, setDevInfo }: DevModalFormProps) {
    const [selectedTechs, setSelectedTechs] = useState([] as {value: string; label: string}[])

    const defaultTechs = [
        { value: 'front-end', label: 'Front-end' },
        { value: 'back-end', label: 'Back-end' },
        { value: 'devops', label: 'DevOps' },
        { value: 'ux/ui', label: 'UX/UI' },
        { value: 'gamedev', label: 'GameDev' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'datascience', label: 'DataScience' }
    ]

    function handleTechsOnChange(event: MultiValue<{value: string; label: string}>) {
        const devTechs = [] as string[]
        event.forEach(tech => {
            devTechs.push(tech.label)
        })
        setDevInfo({ ...devInfo, techs: devTechs.toLocaleString() })
        setSelectedTechs([...event])
    }

    useEffect(() => {
        const textareaList = document.querySelectorAll('textarea')

        function AutoSizeTextareaListener(textarea: HTMLTextAreaElement) {
            setTimeout(function () {
                textarea.style.cssText = 'height:auto; padding:0';
                textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
            }, 0);
        }

        function AutoSizeTextarea(textareaList: NodeListOf<HTMLTextAreaElement>) {
            textareaList.forEach((textarea) => {
                textarea.addEventListener('keydown', () => AutoSizeTextareaListener(textarea))
            })
        }

        function RemoveAutoSizeTextareaListeners(textareaList: NodeListOf<HTMLTextAreaElement>) {
            textareaList.forEach((textarea) => {
                textarea.removeEventListener('keydown', () => AutoSizeTextareaListener(textarea))
            })
        }

        AutoSizeTextarea(textareaList)
        
        const devTechs = devInfo.techs?.split(',')
        devTechs?.forEach((tech) => {
            setSelectedTechs(prevTechs => [...prevTechs, {value: tech, label: tech}])
        })

        return () => {
            RemoveAutoSizeTextareaListeners(textareaList)
            setSelectedTechs([])
        }
    }, [])

    return (
        <div className="inputs-container">
            <div className='input-container'>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"
                    value={devInfo.name ? devInfo.name : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, name: event.target.value })} />
            </div>

            <div className="input-container">
                <label className='avatar-label' htmlFor="avatar">Avatar:
                    <div className="input-container" style={{
                        backgroundColor: devInfo.photo ? '#27AE60' : '#DBB801'
                    }}>
                        {devInfo.photo ? 'Arquivo selecionado' : 'Selecione um arquivo'}
                        <input accept="image/png, image/jpg, image/jpeg" type="file" id="avatar" name="avatar"
                            onChange={(event) => {
                                const file = event.target.files![0]
                                setDevInfo({ ...devInfo, photo: file })
                            }} />
                    </div>
                </label>
            </div>

            <div className="input-container">
                <label htmlFor="role">Cargo:</label>
                <input type="text" id="role" name="role"
                    value={devInfo.role ? devInfo.role : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, role: event.target.value })} />
            </div>

            <div className="input-container">
                <label htmlFor="github">GitHub:</label>
                <input type="text" id="github" name="github"
                    value={devInfo.githubURL ? devInfo.githubURL : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, githubURL: event.target.value })} />
            </div>

            <div className="input-container">
                <label htmlFor="linkedin">Linkedin:</label>
                <input type="text" id="linkedin" name="linkedin"
                    value={devInfo.linkedinURL ? devInfo.linkedinURL : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, linkedinURL: event.target.value })} />
            </div>

            <div className="input-container">
                <label htmlFor="about">Sobre:</label>
                <textarea maxLength={150} id="about" name="about"
                    value={devInfo.about ? devInfo.about : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, about: event.target.value })} />
            </div>

            <div className="input-container">
                <label htmlFor="techs">Tecnologias e Linguagens:</label>
                <div className="creatable-container">
                    <CreatableSelect
                        menuPlacement="top"
                        isMulti
                        maxMenuHeight={150}
                        onChange={(event) => handleTechsOnChange(event)}
                        options={defaultTechs}
                        value={selectedTechs}
                        placeholder='Selecione...'
                    />
                </div>
            </div>
        </div>
    )
}