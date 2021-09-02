import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import cropImageFromCanvas from "./canvasFunctions";
import useDebounce from "./debounce";

const Canvas = ({
	parent,
	setIsSearching,
	setResult,
	missingLetter,
	style,
}) => {
	const [isDrawing, setIsDrawing] = useState();
	const [canvasImg, setCanvasImg] = useState();

	const debouncedSearchTerm = useDebounce(canvasImg, 1000);

	const canvasRef = useRef();
	const contextRef = useRef();

	useEffect(() => {
		if (debouncedSearchTerm) {
			setIsSearching(true);

			axios({
				method: "post",
				url: "https://abc-drawing-game-server.herokuapp.com/json",
				// url: "http://localhost:5000/json",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
				data: debouncedSearchTerm,
			})
				.then(function (response) {
					setIsSearching(false);
					console.log(response);
					setResult(response);
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
		} // eslint-disable-next-line
	}, [debouncedSearchTerm]);

	useEffect(() => {
		const canvas = canvasRef.current;

		canvas.width = parent.current.clientWidth;
		canvas.height = parent.current.clientHeight;
		canvas.style.width = `${parent.current.clientWidth}px`;
		canvas.style.height = `${parent.current.clientWidth}px`;

		const context = canvas.getContext("2d");
		context.scale(1, 1);
		context.lineCap = "round";
		context.strokeStyle = "blue";
		context.lineWidth = 10;

		contextRef.current = context;
		// eslint-disable-next-line
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
		setCanvasImg(imageJson);
		setIsDrawing(false);
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) {
			return;
		}
		setCanvasImg();
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.stroke();
	};

	return (
		<>
			<canvas
				style={style && { backgroundImage: `url(${style})` }}
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				onTouchStart={startDrawing}
				onTouchEnd={finishDrawing}
				onTouchMove={draw}
				ref={canvasRef}
			/>
		</>
	);
};

export default Canvas;
