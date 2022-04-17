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
    try {
      const defaultInfospots = [];
      for (let i = 0; i < panoramas.length; i++) {
        defaultInfospots.push([]);
      }
      setInfospots(defaultInfospots);

      console.log("panoramas-infospot", panoramas);
    } catch (e) {
      console.log(e);
    }
  }, [panoramas, setInfospots]);
  const addTag = (text, imageSrc, videoSrc) => {
    const coordinate = viewer.outputPosition();
    console.log(coordinate);
    const infospot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
    infospot.position.set(
      parseInt(coordinate[0]),
      parseInt(coordinate[1]),
      parseInt(coordinate[2])
    );
    infospot.toPanorama = panoramas[0];

    if (text !== "" && imageSrc === "" && videoSrc === "") {
      infospot.addHoverText(text);
      axios.post("http://localhost:4000/infospots", {
        panoramaId: panoramas[currentPanoIndex].id,
        coordinateX: coordinate[0],
        coordinateY: coordinate[1],
        coordinateZ: coordinate[2],
        type: "textSpot",
        infospotText: text,
      });
      console.log(panoramas[currentPanoIndex].id);
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
    }

    // infospot.addHoverElement(testDiv, 200);

    // infospot.focus(1000, function (k) {
    //   return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    // });

    panoramas[currentPanoIndex].panorama.add(infospot);
    // console.log(currentPanoIndex);
    setInfospots(
      infospots.map((ele, index) =>
        index === currentPanoIndex ? [...ele, infospot] : [...ele]
      )
    );
  };
  const addLink = (text) => {
    const coordinate = viewer.outputPosition();
    console.log(coordinate);
    const linkSpot = panoramas[currentPanoIndex].link(
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

    setInfospots(
      infospots.map((ele, index) =>
        index === currentPanoIndex ? [...ele, linkSpot] : [...ele]
      )
    );

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

      <button
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
      </button>
      <div>도착 파노라마 목록</div>
      <div>
        {panoramas.map((ele, index) => {
          return (
            <div
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
          panoramas[currentPanoIndex].addEventListener(
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
