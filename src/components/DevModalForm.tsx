import { useEffect } from "react";
import { DevModalFormProps } from "../types/devmodalform"

export function DevModalForm({ devInfo, setDevInfo }: DevModalFormProps) {

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

        return () => {
            RemoveAutoSizeTextareaListeners(textareaList)
        }
    }, [])

    return (
        <div className="inputs-container">
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"
                    value={devInfo.name ? devInfo.name : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, name: event.target.value })} />
            </div>

            <div>
                <label className='avatar-label' htmlFor="avatar">Avatar:
                    <div style={{
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

            <div>
                <label htmlFor="role">Cargo:</label>
                <input type="text" id="role" name="role"
                    value={devInfo.role ? devInfo.role : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, role: event.target.value })} />
            </div>

            <div>
                <label htmlFor="github">GitHub:</label>
                <input type="text" id="github" name="github"
                    value={devInfo.githubURL ? devInfo.githubURL : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, githubURL: event.target.value })} />
            </div>

            <div>
                <label htmlFor="linkedin">Linkedin:</label>
                <input type="text" id="linkedin" name="linkedin"
                    value={devInfo.linkedinURL ? devInfo.linkedinURL : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, linkedinURL: event.target.value })} />
            </div>

            <div>
                <label htmlFor="about">Sobre:</label>
                <textarea maxLength={150} id="about" name="about"
                    value={devInfo.about ? devInfo.about : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, about: event.target.value })} />
            </div>

            <div>
                <label htmlFor="techs">Tecnologias e Linguagens:</label>
                <textarea maxLength={150} id="techs" name="techs"
                    value={devInfo.techs ? devInfo.techs : ''}
                    onChange={(event) => setDevInfo({ ...devInfo, techs: event.target.value })} />
            </div>
        </div>
    )
}