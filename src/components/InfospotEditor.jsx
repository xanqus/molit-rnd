import React, { useEffect } from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";
import * as THREE from "three";
import axios from "axios";

const InfospotEditor = ({
  viewer,
  panoramas,
  infospots,
  setInfospots,
  currentPanoIndex,
  setCurrentPanoIndex,
  arrivePanoIndex,
  setArrivePanoIndex,
  currentInfospotIndex,
  setCurrentInfospotIndex,
  infospotText,
  setInfospotText,
  infospotImageSrc,
  setInfospotImageSrc,
  infospotVideoSrc,
  setInfospotVideoSrc,
}) => {
  useEffect(() => {
    if (panoramas[currentPanoIndex]) {
      panoramas[currentPanoIndex].panorama.addEventListener(
        "contextmenu",
        (e) => {
          console.log(e);
          alert("hi");
          e.preventDefault();
        }
      );
    }
  }, [panoramas, currentPanoIndex]);
  const addTag = async (text, imageSrc, videoSrc) => {
    const coordinate = viewer.outputPosition();

    const infospot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
    infospot.position.set(
      parseInt(coordinate[0]),
      parseInt(coordinate[1]),
      parseInt(coordinate[2])
    );

    if (text !== "" && imageSrc === "" && videoSrc === "") {
      infospot.addHoverText(text);
      await axios.post(process.env.REACT_APP_API_HOST + "/infospots", {
        panoramaId: panoramas[currentPanoIndex].id,
        coordinateX: coordinate[0],
        coordinateY: coordinate[1],
        coordinateZ: coordinate[2],
        type: "textSpot",
        infospotText: text,
      });

      setInfospots(infospots.concat(infospot));
    } else if (text !== "" && imageSrc !== "" && videoSrc === "") {
      //여기부터 수정
      const textDiv = document.createElement("div");
      textDiv.innerText = text;
      const newDiv = document.createElement("div");
      newDiv.style.cssText = "width:200px;height:300px;";
      const newImg = document.createElement("img");
      newImg.style.cssText = "width:100%;height:100%;";
      newImg.src = imageSrc;
      newDiv.appendChild(textDiv);
      newDiv.appendChild(newImg);
      infospot.addHoverElement(newDiv, 200);
      await axios.post(process.env.REACT_APP_API_HOST + "/infospots", {
        panoramaId: panoramas[currentPanoIndex].id,
        coordinateX: coordinate[0],
        coordinateY: coordinate[1],
        coordinateZ: coordinate[2],
        type: "imageSpot",
        infospotText: text,
        imageLink: imageSrc,
      });

      // infospot.element.innerText = text;

      setInfospotImageSrc("");
    } else if (text !== "" && imageSrc === "" && videoSrc !== "") {
      const textDiv = document.createElement("div");
      textDiv.innerText = text;
      const newDiv = document.createElement("div");
      newDiv.style.cssText = "width:auto;height:auto;";
      const newVideo = document.createElement("iframe");
      newVideo.src = videoSrc;
      newDiv.appendChild(textDiv);
      newDiv.appendChild(newVideo);
      infospot.addHoverElement(newDiv, 200);
      setInfospotVideoSrc("");
      await axios.post(process.env.REACT_APP_API_HOST + "/infospots", {
        panoramaId: panoramas[currentPanoIndex].id,
        coordinateX: coordinate[0],
        coordinateY: coordinate[1],
        coordinateZ: coordinate[2],
        type: "videoSpot",
        infospotText: text,
        videoLink: videoSrc,
      });
    }

    // infospot.addHoverElement(testDiv, 200);

    // infospot.focus(1000, function (k) {
    //   return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    // });

    panoramas[currentPanoIndex].panorama.add(infospot);
    // console.log(currentPanoIndex);
  };
  const addLink = async (text) => {
    const coordinate = viewer.outputPosition();
    console.log(coordinate);
    const linkSpot = panoramas[currentPanoIndex].panorama.link(
      panoramas[arrivePanoIndex],
      new THREE.Vector3(
        parseInt(coordinate[0]),
        parseInt(coordinate[1]),
        parseInt(coordinate[2])
      ),
      text,
      300
    );
    linkSpot.addEventListener("click", () => {
      setCurrentPanoIndex(arrivePanoIndex);
    });
    linkSpot.toPanorama = panoramas[2].panorama;

    await axios.post(process.env.REACT_APP_API_HOST + "/infospots", {
      panoramaId: panoramas[currentPanoIndex].id,
      coordinateX: coordinate[0],
      coordinateY: coordinate[1],
      coordinateZ: coordinate[2],
      type: "linkSpot",
      infospotText: text,
      startPanoIndex: currentPanoIndex,
      arrivePanoIndex: arrivePanoIndex,
    });

    setArrivePanoIndex(-1);
    console.log(text);
  };

  return (
    <div id="test" style={{ border: "1px solid black" }}>
      <div>
        <div>tag 생성</div>
        <div>
          <div>tag 내용</div>
          <input
            type="text"
            value={infospotText}
            placeholder="tag 내용"
            onChange={(e) => {
              setInfospotText(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="image-input">이미지 등록</label>
          <input
            onChange={(e) => {
              var reader = new FileReader();
              reader.addEventListener(
                "load",
                () => {
                  setInfospotImageSrc(reader.result);
                },
                false
              );
              reader.readAsDataURL(e.target.files[0]);
            }}
            type="file"
            id="image-input"
            style={{ display: "none" }}
          />
        </div>
        <div>
          <div>동영상 링크</div>
          <input
            type="text"
            onChange={(e) => {
              setInfospotVideoSrc(e.target.value);
            }}
            value={infospotVideoSrc}
          />
        </div>
        <button
          onClick={(e) => {
            // if (infospotText === "") {
            //   alert("텍스트를 입력해주세요.");
            //   return;
            // }

            panoramas[currentPanoIndex].panorama.addEventListener(
              "click",
              function handler() {
                addTag(infospotText, infospotImageSrc, infospotVideoSrc);
                this.removeEventListener("click", handler);
                setInfospotText("");
              }
            );
          }}
        >
          tag 생성
        </button>
      </div>

      {/* <button
        onClick={() => {
          if (currentInfospotIndex === -1) {
            alert("수정할 태그를 선택해주세요");
            return;
          }
          if (infospotText === "") {
            alert("수정할 텍스트를 입력해주세요");
            return;
          }
          infospots[currentPanoIndex][currentInfospotIndex].setText(
            infospotText
          );
          setInfospotText("");
          setCurrentInfospotIndex(-1);
        }}
      >
        tag 메시지 수정
      </button> */}
      <div>도착 파노라마 목록</div>
      <div>
        {panoramas.map((ele, index) => {
          return (
            <div
              style={
                index === arrivePanoIndex ? { border: "1px solid red" } : {}
              }
              onClick={() => {
                setArrivePanoIndex(index);
              }}
              key={index}
            >
              {index}번 파노라마
            </div>
          );
        })}
      </div>
      <button
        onClick={(e) => {
          panoramas[currentPanoIndex].panorama.addEventListener(
            "click",
            function handler() {
              addLink(infospotText);
              this.removeEventListener("click", handler);
            }
          );
        }}
      >
        링크 버튼 생성
      </button>
    </div>
  );
};

export default InfospotEditor;
