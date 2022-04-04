import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import MuiForm from "./components/MUIForm/MuiForm";
import MUIRating from './components/MUIRating/MUIRating';
// import "./components/FormRadio/Form.css";
// import FormRadio from "./components/FormRadio/Form";

function App() {
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		setTimeout(() => setOpenModal(true), 2000);
	}, []);

	return (
		<div className="App">
		{/* <Form /> */}
		{/* {<MuiForm/>} */}
		{<MUIRating/>}
		{/* <h1>Promoter Score survey</h1> 
		{openModal && <FormRadio />}  */}
		</div>
	);
}

export default App;
