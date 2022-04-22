import React from "react";

const PanoListItem = ({ viewer, panorama, index, setCurrentPanoIndex }) => {
  try {
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
  } catch (e) {
    console.log(e);
    return <div></div>;
  }
};

export default PanoListItem;
