import React from "react";
import { createRoot } from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom";

import MUIRating from './components/MUIRating/MUIRating';
import Thanks from './components/Thanks/Thanks';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MUIRating />,
	},
	{
		path: "thanks",
		element: <Thanks />
	}
])

createRoot(document.getElementById("psForm")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
