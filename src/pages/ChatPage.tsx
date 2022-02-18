import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { Chat } from "../components/Chat";
import { HeaderBase } from "../components/HeaderBase";
import { Register } from "../components/Register";

import '../styles/pages/chatpage.scss'
import { LoadingCircle } from "../components/LoadingCircle";

export function ChatPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { isLoading } = useLoading()

    function handlePagesRedirect() {
        if (user) {
            if (isLoading) {
                return <LoadingCircle />
            } else {
                return <Chat />
            }
        } else {
            if (isLoading) {
                return <LoadingCircle />
            } else {
                return <Register />
            }
        }
    }

    return (
        <Fragment>
            <HeaderBase>
                {user ? (
                    <div className="signout-container">
                        <Button type="button" onClick={() => signOut(auth)}>
                            Log out
                        </Button>
                    </div>
                ) : (
                    <div className="community-container">
                        <Button type="button" onClick={() => navigate('/devs')}>
                            Comunidade
                        </Button>
                    </div>
                )}
            </HeaderBase>
            {handlePagesRedirect()}
        </Fragment>
    )
}