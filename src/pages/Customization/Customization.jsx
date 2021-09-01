import React, { useState, useEffect, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import "./Customization.css";
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

const Customization = () => {
  const appContext = useContext(AppContext);
  let history = useHistory();

  const [hat, setHat] = useState();
  const [shirt, setShirt] = useState();
  const [pants, setPants] = useState();

  function handleHatChoice(e) {
    if (hat === e.target.src) {
      setHat(undefined);
    } else {
      setHat(e.target.src);
    }
  }

  function handleShirtChoice(e) {
    if (shirt === e.target.src) {
      setShirt(undefined);
    } else {
      setShirt(e.target.src);
    }
  }

  function handlePantsChoice(e) {
    if (pants === e.target.src) {
      setPants(undefined);
    } else {
      setPants(e.target.src);
    }
  }

  useEffect(() => {
    appContext.setCharacterData({
      hat: hat,
      shirt: shirt,
      pants: pants,
    });
  }, [hat, shirt, pants]);

  function returnToHome() {
    history.push("/homepage");
  }

  return (
    <div className="tabs">
      <button onClick={returnToHome}>Back</button>

      <Tabs>
        <TabList>
          <Tab>Hats</Tab>
          <Tab>Shirts</Tab>
          <Tab>Pants</Tab>
        </TabList>

        <TabPanel>
          <div>
            <img onClick={handleHatChoice} id="diamond_hat" src={diamond_hat} />
            <img onClick={handleHatChoice} id="gold_hat" src={gold_hat} />
            <img onClick={handleHatChoice} id="silver_hat" src={silver_hat} />
            <img src={locked} />
            <img src={locked} />
          </div>
          <div>
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
          </div>
          <div>
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <img
              onClick={handleShirtChoice}
              id="diamond_armor"
              src={diamond_armor}
            />
            <img onClick={handleShirtChoice} id="gold_armor" src={gold_armor} />
            <img
              onClick={handleShirtChoice}
              id="silver_armor"
              src={silver_armor}
            />
            <img src={locked} />
            <img src={locked} />
          </div>
          <div>
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
          </div>
          <div>
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <img
              onClick={handlePantsChoice}
              id="diamond_pants"
              src={diamond_pants}
            />
            <img onClick={handlePantsChoice} id="gold_pants" src={gold_pants} />
            <img
              onClick={handlePantsChoice}
              id="silver_pants"
              src={silver_pants}
            />
            <img src={locked} />
            <img src={locked} />
          </div>
          <div>
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
          </div>
          <div>
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
            <img src={locked} />
          </div>
        </TabPanel>
      </Tabs>
      <div className="steve">
        <img className="hat" src={hat} />
        <img className="shirt" src={shirt} />
        <img className="pants" src={pants} />
      </div>
    </div>
  );
};

export default Customization;
