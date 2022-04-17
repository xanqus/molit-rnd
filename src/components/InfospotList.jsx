import React, { useEffect } from "react";

import InfospotListItem from "./InfospotListItem";
import axios from "axios";

const InfospotList = ({
  infospots,
  currentPanoIndex,
  setCurrentInfospotIndex,
}) => {
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("http://localhost:4000/infospots");
    };

    getData();
  }, [infospots, currentPanoIndex]);
  if (Array.isArray(infospots) && infospots.length === 0) {
    return <div></div>;
  } else {
    return (
      <div style={{ border: "1px solid black" }}>
        {infospots[currentPanoIndex].map((element, index) => {
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
