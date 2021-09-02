import React, { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Canvas from "../../components/Canvas/Canvas";
import "./Game.css";
import Word from "../../components/Word/Word";
import AppContext from "../../Context/Context";

const Game = () => {
	const appContext = useContext(AppContext);
	const midDivRef = useRef();
	const history = useHistory();
	const [result, setResult] = useState(0);
	const [wins, setWins] = useState(0);
	const [loses, setLoses] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [isSearching, setIsSearching] = useState(false);
	const [score, setScore] = useState(0);
	const [currentAnimal, setCurrentAnimal] = useState();
	const [animalIndex, setAnimalIndex] = useState(0);

	const animalArray = [
		{ name: "DOG", img: "" },
		{ name: "CAT", img: "" },
		{ name: "COW", img: "" },
		{ name: "APPLE", img: "" },
		{ name: "BANANA", img: "" },
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((seconds) => seconds + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (wins === 3) {
		}
	}, [wins]);

	useEffect(() => {
		if (loses === 3) {
		}
	}, [loses]);

	useEffect(() => {
		if (!result) {
			setLoses((prev) => prev + 1);
			return;
		}
		let extraPoints = 1;
		if (seconds < 19) extraPoints = 20 - seconds;
		setScore((prev) => prev + 100 * extraPoints);
		setWins((prev) => prev++);
		setAnimalIndex((prev) => prev + 1);
	}, [result]);

	useEffect(() => {
		setCurrentAnimal(animalArray[animalIndex]);
	}, [animalIndex]);

	useEffect(() => {}, [isSearching]);

	function returnToHome() {
		history.push("/homepage");
	}

	return (
		<>
			<div className="gameWrap">
				<div className="sectionsWrap">
					<div className="leftSection">
						<div className="scoreWrap">
							<div className="scoreText">Score </div>
						</div>
						<div className="pointsWrap">
							<div className="points">{score}</div>
						</div>
						<div className="eraseWrap">
							<button className="menu" onClick={returnToHome}>
								Main Menu
							</button>
						</div>
					</div>
					<div ref={midDivRef} className="midSection">
						<Canvas
							className="canvas"
							parent={midDivRef}
							setResult={setResult}
							setIsSearching={setIsSearching}
						></Canvas>
						<div className="timerWrap">
							<div className="timer">{seconds}</div>
						</div>
						<div className="topMidSection">
							<div className="imageWrap">
								{currentAnimal && (
									<img alt={""} src={currentAnimal.img} />
								)}
							</div>
							<div className="wordWrap">
								{currentAnimal && (
									<Word word={currentAnimal.name} />
								)}
							</div>
						</div>
					</div>
					<div className="rightSection">
						<div className="mascotWrap">
							<div className="mascot">
								<img
									className="hat"
									alt={""}
									src={localStorage.getItem("hat")}
								/>
								<img
									className="shirt"
									alt={""}
									src={localStorage.getItem("shirt")}
								/>
								<img
									className="pants"
									alt={""}
									src={localStorage.getItem("pants")}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Game;
