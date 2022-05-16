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
        style={
          currentPanoIndex === index
            ? {
                width: "100%",
                height: "auto",
                minHeight: "50px",
                backgroundColor: "#2e39d5",
                color: "#f1f2f6",
              }
            : {
                width: "100%",
                height: "auto",
                minHeight: "50px",
                backgroundColor: "#2e7cd5",
                color: "#f1f2f6",
              }
        }
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
