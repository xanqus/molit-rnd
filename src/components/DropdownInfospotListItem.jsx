import React from "react";

const DropdownInfospotListItem = ({ dropdownInfospotItem, infospot }) => {
  return (
    <div
      style={{ backgroundColor: "#7bed9f" }}
      onClick={() => {
        infospot.focus(1000, function (k) {
          return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        });
      }}
    >
      {dropdownInfospotItem !== undefined
        ? dropdownInfospotItem.infospotText
        : ""}
    </div>
  );
};

export default DropdownInfospotListItem;
