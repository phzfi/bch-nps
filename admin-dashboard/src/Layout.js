import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';

const Layout = () => {
    return (
        <>       
            <Navbar/> 
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;