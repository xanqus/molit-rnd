import React from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";
import * as THREE from "three";
import PanoListItem from "./PanoListItem";

const PanoList = ({ viewer, panoramas, setCurrentPanoIndex }) => {
  return (
    <div>
      {panoramas.map((ele, index) => (
        <PanoListItem
          viewer={viewer}
          panorama={panoramas[index]}
          index={index}
          key={index}
          setCurrentPanoIndex={setCurrentPanoIndex}
        />
      ))}
    </div>
  );
};

export default PanoList;
