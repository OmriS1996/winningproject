import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import cropImageFromCanvas from "./canvasFunctions";

const Canvas = () => {
	const [result, setResult] = useState();
	const [isDrawing, setIsDrawing] = useState();

	const canvasRef = useRef();
	const contextRef = useRef();

	useEffect(() => {
		const canvas = canvasRef.current;

		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		const context = canvas.getContext("2d");
		context.scale(2, 2);
		context.lineCap = "round";
		context.strokeStyle = "black";
		context.lineWidth = 10;

		contextRef.current = context;
	}, []);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		contextRef.current.closePath();
		const croppedCanvas = cropImageFromCanvas(canvasRef.current);
		const imgString = croppedCanvas.toDataURL();
		const imageJson = JSON.stringify({
			data: imgString.slice(22, imgString.length),
		});

		axios({
			method: "post",
			url: "https://abc-drawing-game-server.herokuapp.com/bad_prediction",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
			data: imageJson,
		})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		contextRef.current.clearRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);
		setIsDrawing(false);
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) {
			return;
		}
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.stroke();
	};

	return (
		<>
			<canvas
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				ref={canvasRef}
			/>
		</>
	);
};

export default Canvas;
