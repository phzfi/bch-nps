import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav>
			<h1>Promoter Score</h1>
			<ul>
				<li>
					<NavLink to="/">Dashboard</NavLink>
				</li>
				<li>
					<NavLink to="/embedform">Embed</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
