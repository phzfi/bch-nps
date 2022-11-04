import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

import { onAuthStateChanged } from 'firebase/auth';

import { auth, authUiConfig } from "../firebase-config";
import StyledFireBaseAuth from "./StyledFireBaseAuth";

const LoginModal = () => {
    // right after page load the user session is almost always null.
    // wait for the onAuthStateChanged() callback to get the real session state
    
    // let's show the modal only after we're sure the user session is not present
    const [show, setShow] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(`${user.email} (uid: ${user.uid}) signed in`)
            setShow(false)
        } else {
            console.log("signed out")
            setShow(true)
        }
    })

    return (
        <>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}>
                <StyledFireBaseAuth
                    uiConfig={authUiConfig}
                    firebaseAuth={auth}
                    className={"firebase-auth"}
                />
            </Modal>
        </>
    );
}

export default LoginModal;
