import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Settings from "../../components/settings/settings";
import Modal from "react-modal";
import "./Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCog, faGift } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  let history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customization = () => {
    history.push("/customization");
  };

  function play() {
    history.push("/game");
  }

  return (
    <div className="home-wrapper">
      <div></div>
      <div className="main">
        <button onClick={play} className="Play-btn">
          <FontAwesomeIcon icon={faPlay} />
          Play
        </button>
        <button className="custom-btn" onClick={customization}>
          <FontAwesomeIcon icon={faGift} />
          Customize
        </button>
      </div>
      <div className="optionsDiv">
        <button onClick={openModal} className="options">
          <FontAwesomeIcon icon={faCog} />
          Options
        </button>
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
              background: "#B67B65",
            },
          }}
        >
          <button onClick={closeModal}>Back</button>
          <Settings />
        </Modal>
      </div>
    </div>
  );
};

export default Homepage;
