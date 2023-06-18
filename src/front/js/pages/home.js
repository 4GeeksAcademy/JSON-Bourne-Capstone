import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Comments from "./comments";

export const Home = ({name}) => {
	const { store, actions } = useContext(Context);




	return (
		<div className="text-center mt-5">
			<h1>{name}</h1>
			
			<Comments imageUrl={rigoImageUrl}/>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
