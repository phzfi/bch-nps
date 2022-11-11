import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaChartPie } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi'
import { signOut } from "firebase/auth";

import { auth } from "../firebase-config";

const handleSignOut = _ => {
	signOut(auth).then(() => console.log("sign-out successful"))
	.catch((err) => console.log("couldn't sign out:", err))
}

const Navbar = () => {
	return (
		<nav>
			<h1>Promoter Score</h1>
			<ul>
				<li>
					<NavLink to="/"><FaChartPie /> Dashboard</NavLink>
				</li>
				<li>
				    <NavLink onClick={handleSignOut}><HiOutlineLogout /> Sign out</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
