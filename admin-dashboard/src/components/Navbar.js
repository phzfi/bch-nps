import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaChartPie } from 'react-icons/fa';
import { ImEmbed2 } from 'react-icons/im';


const Navbar = () => {
	return (
		<nav>
			<h1>Promoter Score</h1>
			<ul>
				<li>
					<NavLink to="/"><FaChartPie /> Dashboard</NavLink>
				</li>
				<li>
					<NavLink to="/embedform"><ImEmbed2 /> Embed</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
