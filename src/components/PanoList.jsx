import React, { useEffect } from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";
import PanoListItem from "./PanoListItem";
import axios from "axios";
import * as THREE from "three";

const PanoList = ({
  viewer,
  panoramas,
  setPanoramas,
  infospots,
  currentPanoIndex,
  setCurrentPanoIndex,
  dropDownMenuItems,
  setDropDownMenuItems,
  infospotListForDropdown,
  setInfospotListForDropdown,
}) => {
  const dropDownInfospotItems = [];
  const infospotListArray = [];

  useEffect(() => {
    for (let i = 0; i < panoramas.length; i++) {
      const tmp = [];
      const tmpList = [];
      for (let j = 0; j < infospots.length; j++) {
        if (panoramas[i].id === infospots[j].panoramaId) {
          tmp.push(infospots[j]);
          const tmpInfospot = new PANOLENS.Infospot(
            300,
            PANOLENS.DataImage.Info
          );

          tmpInfospot.position.set(
            parseInt(infospots[j].coordinateX),
            parseInt(infospots[j].coordinateY),
            parseInt(infospots[j].coordinateZ)
          );
          if (infospots[j].type !== "linkSpot") {
            if (infospots[j].type === "textSpot") {
              tmpInfospot.addHoverText(infospots[j].infospotText);
            } else if (infospots[j].type === "imageSpot") {
              const textDiv = document.createElement("div");
              textDiv.innerText = infospots[j].infospotText;
              const newDiv = document.createElement("div");
              newDiv.style.cssText = "width:200px;height:300px;color:white;";
              const newImg = document.createElement("img");
              newImg.style.cssText = "width:100%;height:100%;";
              newImg.src = infospots[j].imageLink;
              newDiv.appendChild(textDiv);
              newDiv.appendChild(newImg);
              tmpInfospot.addHoverElement(newDiv, 200);
            } else if (infospots[j].type === "videoSpot") {
              const textDiv = document.createElement("div");
              textDiv.innerText = infospots[j].infospotText;
              const newDiv = document.createElement("div");
              newDiv.style.cssText = "width:auto;height:auto;color:white;";
              const newVideo = document.createElement("iframe");
              newVideo.src = infospots[j].videoLink;
              newDiv.appendChild(textDiv);
              newDiv.appendChild(newVideo);
              tmpInfospot.addHoverElement(newDiv, 200);
            }

            tmpList.push(tmpInfospot);
            panoramas[i].panorama.add(tmpInfospot);
          } else {
            const linkSpot = panoramas[
              infospots[j].startPanoIndex
            ].panorama.link(
              panoramas[infospots[j].arrivePanoIndex].panorama,
              new THREE.Vector3(
                parseInt(infospots[j].coordinateX),
                parseInt(infospots[j].coordinateY),
                parseInt(infospots[j].coordinateZ)
              ),
              infospots[j].infospotText,
              300
            );
            linkSpot.addEventListener("click", () => {
              setCurrentPanoIndex(infospots[j].arrivePanoIndex);
            });
            tmpList.push(linkSpot);
          }
        }
      }
      infospotListArray.push(tmpList);

      dropDownInfospotItems.push(tmp);

      //console.log("dropDownInfospotItems", dropDownInfospotItems);
    }
    setInfospotListForDropdown(infospotListArray);
    setDropDownMenuItems(dropDownInfospotItems);
    // console.log("dropDownInfospotItems", dropDownInfospotItems);
    // console.log("infospotListArray", infospotListArray);
  }, [panoramas, infospots, setDropDownMenuItems]);

  useEffect(() => {
    try {
      const getData = async () => {
        const panoramaList = [];
        const data = await axios.get(
          process.env.REACT_APP_API_HOST + "/panoramas"
        );

        for (let i = 0; i < data.data.length; i++) {
          const panorama = new PANOLENS.ImagePanorama(data.data[i].photoURL);
          if (viewer !== undefined) {
            viewer.add(panorama);
          }
          panoramaList.push({ panorama: panorama, id: data.data[i]._id });
        }

        setPanoramas(panoramaList);
      };

      getData();
    } catch (e) {
      console.log(e);
    }
  }, [viewer, setPanoramas]);
  return (
    <div>
      {panoramas.map((ele, index) => {
        return (
          <PanoListItem
            dropDownMenuItems={dropDownMenuItems}
            viewer={viewer}
            panorama={panoramas[index].panorama}
            index={index}
            key={index}
            setCurrentPanoIndex={setCurrentPanoIndex}
            infospotListForDropdown={infospotListForDropdown}
            currentPanoIndex={currentPanoIndex}
          />
        );
      })}
    </div>
  );
};

export default PanoList;
