import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";
import Instructions from "./components/Instructions";
import "./App.css";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="/embedform" element={<Instructions />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
