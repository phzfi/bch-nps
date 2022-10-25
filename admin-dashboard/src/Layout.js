import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import StyledFireBaseAuth from "./components/StyledFireBaseAuth";
import './App.css';
import { auth, authUiConfig } from './firebase-config'

const Layout = () => {
    return (
        <>       
            <StyledFireBaseAuth
                uiConfig={authUiConfig}
                firebaseAuth={auth}
                className={"firebase-auth"}
            />
            <Navbar/> 
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
