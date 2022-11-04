import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';
import LoginModal from "./components/LoginModal";

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
