import { Fragment } from "react";
import { ModalProps } from "../types/components/modal";

export function Modal({ children, isModalOpen }: ModalProps) {
    function handleModalAppear(isModalOpen: boolean) {
        return isModalOpen ? (
            <Fragment>
                <div className="modal-component">
                    {children}
                </div>
            </Fragment>
        ) : null
    }

    return handleModalAppear(isModalOpen)
}