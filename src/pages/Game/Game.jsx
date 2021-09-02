import React, { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Canvas from "../../components/Canvas/Canvas";
import "./Game.css";
import Word from "../../components/Word/Word";
import diamond_hat from "../../Images/diamond_hat.png";
import diamond_armor from "../../Images/diamond_armor.png";
import diamond_pants from "../../Images/diamond_pants.png";
import silver_hat from "../../Images/silver_hat.png";
import silver_armor from "../../Images/silver_armor.png";
import silver_pants from "../../Images/silver_pants.png";
import gold_armor from "../../Images/gold_armor.png";
import gold_hat from "../../Images/gold_hat.png";
import gold_pants from "../../Images/gold_pants.png";
import AppContext from "../../Context/Context";
import locked from "../../Images/locked.jpg";

const Game = () => {
  const appContext = useContext(AppContext);
  const midDivRef = useRef();
  let history = useHistory();
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
            {/* <div className="timerWrap">
              <div className="timer">Timer</div>
            </div> */}
            <div className="mascotWrap">
              <div className="mascot">
                <img className="hat" src={localStorage.getItem("hat")} />
                <img className="shirt" src={localStorage.getItem("shirt")} />
                <img className="pants" src={localStorage.getItem("pants")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
