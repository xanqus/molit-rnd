import React from "react";
import DropdownInfospotList from "./DropdownInfospotList";

const PanoListItem = ({
  viewer,
  panorama,
  index,
  setCurrentPanoIndex,
  dropDownMenuItems,
  infospotListForDropdown,
  currentPanoIndex,
}) => {
  try {
    return (
      <div
        style={currentPanoIndex === index ? { border: "1px solid red" } : {}}
      >
        <div
          onClick={() => {
            viewer.setPanorama(panorama);
            setCurrentPanoIndex(index);
            console.log(dropDownMenuItems[0]);
          }}
        >
          {index}번 파노라마
        </div>
        <DropdownInfospotList
          dropdownInfospotItems={dropDownMenuItems[index]}
          infospotList={infospotListForDropdown[index]}
          index={index}
          currentPanoIndex={currentPanoIndex}
        />
      </div>
    );
  } catch (e) {
    console.log(e);
    return <div></div>;
  }
};

export default PanoListItem;
