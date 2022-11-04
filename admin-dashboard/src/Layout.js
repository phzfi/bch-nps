import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import StyledFireBaseAuth from "./components/StyledFireBaseAuth";
import './App.css';
import { auth, authUiConfig } from './firebase-config'
import LoginModal from "./components/modal";

const Layout = () => {
    return (
        <>
            <LoginModal />
            <Navbar/> 
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
