import React from "react";

const InfospotListItem = ({ index, infospot, setCurrentInfospotIndex }) => {
  try {
    return (
      <div
        onClick={() => {
          setCurrentInfospotIndex(index);
          infospot.focus(1000, function (k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
          });
        }}
      >
        {infospot.element.innerText}
      </div>
    );
  } catch (e) {
    console.log(e);
    return <div></div>;
  }
};

export default InfospotListItem;
