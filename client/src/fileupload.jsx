import React, { useRef, useState } from "react";

const fileupload = ({ url }) => {
	const base = import.meta.env.VITE_SERVER_URL;
	const request_url = new URL(url, base);
	const ref = useRef(null);
	const [prediction, setPrediction] = useState(null);
	const [loading,setLoading] = useState(false);
	const [file,setFile] = useState(null);
	const [preview,setPreview] = useState(null);

	const handleChange = (e) => {
		setFile(ref.current.files[0])
		const preview = URL.createObjectURL(ref.current.files[0]);
		setPreview(preview);
	}
	const handleSubmit = async (e) => {
    e.preventDefault();
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			const response = await fetch(request_url, {
				method: "POST",
				contentType: "multipart/form-data",
				body: formData,
				mode: 'no-cors'
			});
			const data = await response.json();
			setLoading(false);
			setPrediction(data);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
		
	};

	return (
		<>
			<form
				className="bg-white/80 p-4 rounded flex flex-1 flex-col gap-2"
				encType="multipart/form-data"
			>
				{ file && preview ? (<img height={200} className=" min-h-[200px] max-h-[200px]" alt="image" src={preview} />) :(<input type="file" accept="image/*" name="file" ref={ref} onChange={handleChange} />) }
				<button onClick={handleSubmit} onSubmit={handleSubmit}>
					{loading ? "Predicting..." : "Upload"}
				</button>
			</form>
			{prediction && (
				<div className="flex flex-1 gap-2 justify-center items-center">
					<p className="text-2xl text-bold">Prediction</p><span>:</span><p className="text-2xl text-bold text-emerald-700">{prediction.disease}, {prediction.confidence}</p>
				</div>
			)}
		</>
	);
};

export default fileupload;
