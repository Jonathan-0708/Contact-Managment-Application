import React, { useContext } from "react";
import "../../styles/home.scss";
import Card from "../component/Card";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store } = useContext(Context);

	return (
		<div>
			{store.contact.map((contact, index) => {
				return (
					<div key={`contact-card-${index}`}>
						<Card element={contact} indexNuevo={index} />
					</div>
				);
			})}
		</div>
	);
};
