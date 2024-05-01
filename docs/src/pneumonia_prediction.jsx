import Card from "./card";
import Fileupload from "./fileupload";
import React from "react";

const pneumonia_prediction = () => {
	return (
		<Card>
			<h2 className="text-2xl text-blue-900">
				Pnemonia Disease Diagonsis
			</h2>
			<Fileupload url="/predict-pneumonia" />
		</Card>
	);
};

export default pneumonia_prediction;
