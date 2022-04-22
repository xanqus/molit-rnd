import React, { useEffect } from "react";
import InfospotListItem from "./InfospotListItem";
import axios from "axios";
import * as THREE from "three";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";

const InfospotList = ({
  panoramas,
  infospots,
  setInfospots,
  currentPanoIndex,
  setCurrentPanoIndex,
  setCurrentInfospotIndex,
}) => {
  useEffect(() => {
    const infospotListFromDb = [];
    try {
      const getData = async () => {
        if (Array.isArray(panoramas) && panoramas.length !== 0) {
          await axios
            .get(`/infospots/${panoramas[currentPanoIndex].id}`)
            .then(async (data) => {
              for (let i = 0; i < data.data.length; i++) {
                const infospot = await new PANOLENS.Infospot(
                  300,
                  PANOLENS.DataImage.Info
                );
                infospot.position.set(
                  parseInt(data.data[i].coordinateX),
                  parseInt(data.data[i].coordinateY),
                  parseInt(data.data[i].coordinateZ)
                );
                if (data.data[i].type !== "linkSpot") {
                  if (data.data[i].type === "textSpot") {
                    infospot.addHoverText(data.data[i].infospotText);
                  } else if (data.data[i].type === "imageSpot") {
                    const textDiv = document.createElement("div");
                    textDiv.innerText = data.data[i].infospotText;
                    const newDiv = document.createElement("div");
                    newDiv.style.cssText =
                      "width:200px;height:300px;color:white;";
                    const newImg = document.createElement("img");
                    newImg.style.cssText = "width:100%;height:100%;";
                    newImg.src = data.data[i].imageLink;
                    newDiv.appendChild(textDiv);
                    newDiv.appendChild(newImg);
                    infospot.addHoverElement(newDiv, 200);
                  } else if (data.data[i].type === "videoSpot") {
                    const textDiv = document.createElement("div");
                    textDiv.innerText = data.data[i].infospotText;
                    const newDiv = document.createElement("div");
                    newDiv.style.cssText =
                      "width:auto;height:auto;color:white;";
                    const newVideo = document.createElement("iframe");
                    newVideo.src = data.data[i].videoLink;
                    newDiv.appendChild(textDiv);
                    newDiv.appendChild(newVideo);
                    infospot.addHoverElement(newDiv, 200);
                  }
                  panoramas[currentPanoIndex].panorama.add(infospot);
                  infospotListFromDb.push(infospot);
                } else {
                  const linkSpot = panoramas[
                    data.data[i].startPanoIndex
                  ].panorama.link(
                    panoramas[data.data[i].arrivePanoIndex].panorama,
                    new THREE.Vector3(
                      parseInt(data.data[i].coordinateX),
                      parseInt(data.data[i].coordinateY),
                      parseInt(data.data[i].coordinateZ)
                    ),
                    data.data[i].infospotText,
                    300
                  );
                  linkSpot.addEventListener("click", () => {
                    setCurrentPanoIndex(data.data[i].arrivePanoIndex);
                  });
                  linkSpot.toPanorama = panoramas[2].panorama;
                  infospotListFromDb.push(linkSpot);
                }
              }
              setInfospots(infospotListFromDb);
            });
        }
      };
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [panoramas, currentPanoIndex, setInfospots]);
  if (Array.isArray(infospots) && infospots.length === 0) {
    return <div></div>;
  } else {
    return (
      <div style={{ border: "1px solid black" }}>
        {infospots.map((element, index) => {
          return (
            <InfospotListItem
              key={index}
              index={index}
              infospot={infospots[index]}
              setCurrentInfospotIndex={setCurrentInfospotIndex}
            />
          );
        })}
      </div>
    );
  }
};

export default InfospotList;
