const receiveMessage = (event) => {
	if (event.data === "removetheiframe") {
		const element = document.getElementById("ps-form");
		element?.remove();
	}
};
window.addEventListener("message", receiveMessage, false);
