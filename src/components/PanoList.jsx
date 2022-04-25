import React, { useEffect } from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";
import PanoListItem from "./PanoListItem";
import axios from "axios";

const PanoList = ({ viewer, panoramas, setPanoramas, setCurrentPanoIndex }) => {
  useEffect(() => {
    try {
      const getData = async () => {
        const panoramaList = [];
        const data = await axios.get(
          process.env.REACT_APP_API_HOST + "/panoramas"
        );

        for (let i = 0; i < data.data.length; i++) {
          const panorama = new PANOLENS.ImagePanorama(data.data[i].photoURL);
          if (viewer !== undefined) {
            viewer.add(panorama);
          }
          panoramaList.push({ panorama: panorama, id: data.data[i]._id });
        }
        setPanoramas(panoramaList);
      };

      getData();
    } catch (e) {
      console.log(e);
    }
  }, [viewer, setPanoramas]);
  return (
    <div>
      {panoramas.map((ele, index) => (
        <PanoListItem
          viewer={viewer}
          panorama={panoramas[index].panorama}
          index={index}
          key={index}
          setCurrentPanoIndex={setCurrentPanoIndex}
        />
      ))}
    </div>
  );
};

export default PanoList;
