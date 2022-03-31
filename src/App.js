import { useState } from "react";
import Viewer from "./components/Viewer";
import PanoList from "./components/PanoList";
import PanoCreator from "./components/PanoCreator";
import InfospotList from "./components/InfospotList";
import InfospotEditor from "./components/InfospotEditor";
import * as THREE from "three";

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

  return (
    <div
      style={{
        width: "100vw",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
      }}
    >
      <Viewer setViewer={setViewer} />
      <PanoCreator
        viewer={viewer}
        panoramas={panoramas}
        setPanoramas={setPanoramas}
        infospots={infospots}
        setInfospots={setInfospots}
      />
      <PanoList
        viewer={viewer}
        panoramas={panoramas}
        setCurrentPanoIndex={setCurrentPanoIndex}
      />
      <InfospotList
        infospots={infospots}
        currentPanoIndex={currentPanoIndex}
        setCurrentInfospotIndex={setCurrentInfospotIndex}
      />
      <InfospotEditor
        viewer={viewer}
        panoramas={panoramas}
        infospots={infospots}
        setInfospots={setInfospots}
        currentPanoIndex={currentPanoIndex}
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
    </div>
  );
}

export default App;
