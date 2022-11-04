import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import {auth, authUiConfig} from "../firebase-config";
import StyledFireBaseAuth from "./StyledFireBaseAuth";

const LoginModal =()=> {
    const [show, setShow] = useState(true);

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
