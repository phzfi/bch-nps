import { useState } from 'react'
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const Thanks = () => {
	const [thanksMsg, setThanksMsg] = useState("");

	// get "thank you" message
	const configDocRef = doc(db, "config", "form");
	getDoc(configDocRef).then((data) => {
		if (data.exists())
			setThanksMsg(data.data().thankYouMessage)
	});

	return (<h1 style={{textAlign: "center", margin: "100px auto"}}>{thanksMsg}</h1>)
}

export default Thanks;
