import React from "react";
import PanoListItem from "./PanoListItem";

const PanoList = ({ viewer, panoramas, setCurrentPanoIndex }) => {
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
