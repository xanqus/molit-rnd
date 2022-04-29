import React from "react";

const DropdownInfospotListItem = ({ dropdownInfospotItem, infospot }) => {
  return (
    <div
      style={{ border: "1px solid blue" }}
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
