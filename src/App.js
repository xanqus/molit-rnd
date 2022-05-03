import React, { useState, useEffect } from "react";
import Viewer from "./components/Viewer";
import PanoList from "./components/PanoList";
import PanoCreator from "./components/PanoCreator";
import InfospotList from "./components/InfospotList";
import InfospotEditor from "./components/InfospotEditor";
import axios from "axios";

function App() {
  const [viewer, setViewer] = useState();
  const [panoramas, setPanoramas] = useState([]);
  const [infospots, setInfospots] = useState([]);
  const [currentPanoIndex, setCurrentPanoIndex] = useState(0);
  const [arrivePanoIndex, setArrivePanoIndex] = useState(-1);
  const [currentInfospotIndex, setCurrentInfospotIndex] = useState(-1);
  const [infospotText, setInfospotText] = useState("");
  const [infospotImageSrc, setInfospotImageSrc] = useState("");
  const [infospotVideoSrc, setInfospotVideoSrc] = useState("");
  const [dropDownMenuItems, setDownDropMenuItems] = useState([]);
  const [infospotListForDropdown, setInfospotListForDropdown] = useState([]);
  useEffect(() => {
    const getInfospots = async () => {
      const data = await axios.get(
        process.env.REACT_APP_API_HOST + "/infospots"
      );
      setInfospots(data.data);
    };
    getInfospots();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "auto",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "80vw",
          height: "90vh",
        }}
      >
        <Viewer setViewer={setViewer} />
      </div>
      <div
        style={{
          width: "10vw",
          height: "90vh",
        }}
      >
        <PanoCreator
          setViewer={setViewer}
          viewer={viewer}
          panoramas={panoramas}
          setPanoramas={setPanoramas}
          infospots={infospots}
          setInfospots={setInfospots}
        />
        <PanoList
          viewer={viewer}
          panoramas={panoramas}
          setPanoramas={setPanoramas}
          infospots={infospots}
          currentPanoIndex={currentPanoIndex}
          setCurrentPanoIndex={setCurrentPanoIndex}
          dropDownMenuItems={dropDownMenuItems}
          setDropDownMenuItems={setDownDropMenuItems}
          infospotListForDropdown={infospotListForDropdown}
          setInfospotListForDropdown={setInfospotListForDropdown}
        />
      </div>
      {/* <InfospotList
        panoramas={panoramas}
        infospots={infospots}
        setInfospots={setInfospots}
        currentPanoIndex={currentPanoIndex}
        setCurrentPanoIndex={setCurrentPanoIndex}
        setCurrentInfospotIndex={setCurrentInfospotIndex}
      /> */}
      <div
        style={{
          width: "10vw",
          height: "90vh",

          color: "#000000",
        }}
      >
        <InfospotEditor
          viewer={viewer}
          panoramas={panoramas}
          infospots={infospots}
          setInfospots={setInfospots}
          currentPanoIndex={currentPanoIndex}
          setCurrentPanoIndex={setCurrentPanoIndex}
          arrivePanoIndex={arrivePanoIndex}
          setArrivePanoIndex={setArrivePanoIndex}
          currentInfospotIndex={currentInfospotIndex}
          setCurrentInfospotIndex={setCurrentInfospotIndex}
          infospotText={infospotText}
          setInfospotText={setInfospotText}
          infospotImageSrc={infospotImageSrc}
          setInfospotImageSrc={setInfospotImageSrc}
          infospotVideoSrc={infospotVideoSrc}
          setInfospotVideoSrc={setInfospotVideoSrc}
        />
        {/* <button
        onClick={async () => {
          const data = await axios.get("/panoramas");
          console.log(data);
        }}
      >
        test
      </button> */}
      </div>
    </div>
  );
}

export default App;
