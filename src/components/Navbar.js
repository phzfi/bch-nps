import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Dashboard</Link></li>
                <li><Link to='/propertymanager'>Property manager</Link></li>
                <li><Link to='/account'>Account</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;