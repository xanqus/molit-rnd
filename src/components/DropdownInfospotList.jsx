import React from "react";
import DropdownInfospotListItem from "./DropdownInfospotListItem";

const DropdownInfospotList = ({
  dropdownInfospotItems,
  infospotList,
  index,
  currentPanoIndex,
}) => {
  return (
    <div
      style={
        currentPanoIndex === index ? { display: "block" } : { display: "none" }
      }
    >
      {dropdownInfospotItems !== undefined ? (
        dropdownInfospotItems.map((ele, index) => {
          return (
            <DropdownInfospotListItem
              dropdownInfospotItem={dropdownInfospotItems[index]}
              infospot={infospotList[index]}
            />
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DropdownInfospotList;
