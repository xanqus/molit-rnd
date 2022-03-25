import React, { useEffect } from "react";

import InfospotListItem from "./InfospotListItem";

const InfospotList = ({
  infospots,
  currentPanoIndex,
  setCurrentInfospotIndex,
}) => {
  useEffect(() => {
    console.log(infospots);
  }, [infospots]);
  if (Array.isArray(infospots) && infospots.length === 0) {
    return <div></div>;
  } else {
    return (
      <div style={{ border: "1px solid black" }}>
        {infospots[currentPanoIndex].map((element, index) => {
          console.log("infospots", infospots[currentPanoIndex][index]);
          return (
            <InfospotListItem
              key={index}
              index={index}
              infospot={infospots[currentPanoIndex][index]}
              setCurrentInfospotIndex={setCurrentInfospotIndex}
            />
          );
        })}
      </div>
    );
  }
};

export default InfospotList;
