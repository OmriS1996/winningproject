import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Canvas from "../../components/Canvas/Canvas";
import "./Game.css";
import Word from "../../components/Word/Word";
import cat from "../../Images/cat.jpg";
import dog from "../../Images/dog.jpg";
import cow from "../../Images/cow.png";
import apple from "../../Images/apple.jpg";
import banana from "../../Images/banana.jpg";
import A from "../../Images/A.png";
import B from "../../Images/B.png";
import C from "../../Images/C.png";
import D from "../../Images/D.png";
import E from "../../Images/E.png";
import G from "../../Images/G.png";
import L from "../../Images/L.png";
import N from "../../Images/N.png";
import O from "../../Images/O.png";
import P from "../../Images/P.png";
import T from "../../Images/T.png";
import W from "../../Images/W.png";
import diamond_armor from "../../Images/diamond_armor.png";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinWink } from "@fortawesome/free-solid-svg-icons";

const Game = () => {
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
	const [intervalToClear, setIntervalToClear] = useState();
	const [missingLetter, setMissingLetter] = useState();
	const [missingLetterIndex, setMissingLetterIndex] = useState();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [imgSrc, setImgSrc] = useState();

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const animalArray = [
		{ name: "DOG", img: dog },
		{ name: "CAT", img: cat },
		{ name: "COW", img: cow },
		{ name: "APPLE", img: apple },
		{ name: "BANANA", img: banana },
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((seconds) => seconds + 1);
		}, 1000);
		setIntervalToClear(interval);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!wins) return;
		setImgSrc();
		openModal();
		setTimeout(() => {
			closeModal();
		}, 1500);
	}, [wins]);

	useEffect(() => {
		console.log(loses);
		if (loses === 3) {
			setLoses(0);
			if (missingLetter === "A") setImgSrc(A);
			if (missingLetter === "B") setImgSrc(B);
			if (missingLetter === "C") setImgSrc(C);
			if (missingLetter === "D") setImgSrc(D);
			if (missingLetter === "E") setImgSrc(E);
			if (missingLetter === "G") setImgSrc(G);
			if (missingLetter === "L") setImgSrc(L);
			if (missingLetter === "N") setImgSrc(N);
			if (missingLetter === "O") setImgSrc(O);
			if (missingLetter === "P") setImgSrc(P);
			if (missingLetter === "T") setImgSrc(T);
			if (missingLetter === "W") setImgSrc(W);
		}
	}, [loses]);

	useEffect(() => {
		if (!result) {
			return;
		}
		console.log(result);
		if (result?.data.letter !== missingLetter) {
			setLoses((prev) => prev + 1);
			return;
		}
		let extraPoints = 1;
		if (seconds < 19) extraPoints = 20 - seconds;
		setScore((prev) =>
			Math.floor(prev + 100 * extraPoints * result?.data.certain)
		);
		setWins((prev) => prev + 1);
		setAnimalIndex((prev) => prev + 1);
		clearInterval(intervalToClear);
		setSeconds(0);
		const interval = setInterval(() => {
			setSeconds((seconds) => seconds + 1);
		}, 1000);
		setIntervalToClear(interval);
		return () => clearInterval(interval);
	}, [result]);

	useEffect(() => {
		if (animalIndex === 5) setAnimalIndex(0);
		setCurrentAnimal(animalArray[animalIndex]);
	}, [animalIndex]);

	useEffect(() => {
		if (!currentAnimal) return;
		const missLetterIndex = Math.floor(
			Math.random() * currentAnimal.name.length
		);
		setMissingLetterIndex(missLetterIndex);
		console.log(currentAnimal);
		setMissingLetter(currentAnimal.name.charAt(missLetterIndex));
	}, [currentAnimal]);

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
							style={imgSrc}
							className="canvas"
							parent={midDivRef}
							setResult={setResult}
							setIsSearching={setIsSearching}
							missingLetter={missingLetter}
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
									<Word
										word={currentAnimal.name}
										missingLetterIndex={missingLetterIndex}
									/>
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
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel="settings"
				style={{
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
						background: "green",
					},
				}}
			>
				{wins % 3 !== 0 ? (
					<>
						Good Job!
						<FontAwesomeIcon icon={faGrinWink} />
					</>
				) : (
					<>
						Array! new item!
						<img alt={""} src={diamond_armor} />
					</>
				)}
			</Modal>
		</>
	);
};

export default Game;
