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
	const [wins, setWins] = useState();
	const [result, setResult] = useState();
	const [isSearching, setIsSearching] = useState(false);
	const [score, setScore] = useState(0);

	useEffect(() => {
		if (wins === 3) {
		}
	}, [wins]);

	useEffect(() => {
		if (result) {
			setScore((prev) => prev + 100);
			setWins((prev) => prev++);
		}
	}, [result]);

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
						<div className="topMidSection">
							<div className="imageWrap">
								<div className="image">image</div>
							</div>
							<div className="wordWrap">
								<Word word="cat" />
							</div>
						</div>
					</div>
					<div className="rightSection">
						<div className="timerWrap">
							<div className="timer">Timer</div>
						</div>
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
