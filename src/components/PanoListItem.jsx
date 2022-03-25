import React from "react";

const PanoListItem = ({ viewer, panorama, index, setCurrentPanoIndex }) => {
  return (
    <div
      onClick={() => {
        viewer.setPanorama(panorama);
        setCurrentPanoIndex(index);
      }}
    >
      {index}번 파노라마
    </div>
  );
};

export default PanoListItem;
