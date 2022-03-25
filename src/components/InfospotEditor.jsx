import React from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";

const InfospotEditor = ({
  viewer,
  panoramas,
  infospots,
  setInfospots,
  currentPanoIndex,
  currentInfospotIndex,
  setCurrentInfospotIndex,
  infospotText,
  setInfospotText,
}) => {
  const addTag = (text) => {
    const coordinate = viewer.outputPosition();
    console.log(coordinate);
    const infospot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
    infospot.position.set(
      parseInt(coordinate[0]),
      parseInt(coordinate[1]),
      parseInt(coordinate[2])
    );
    infospot.addHoverText(text);

    // const newDiv = document.createElement("div");
    // newDiv.style.cssText = "width:200px;height:300px;";
    // const newImg = document.createElement("img");
    // newImg.style.cssText = "width:100%;height:100%;";
    // newImg.src = "/assets/1.JPG";
    // newDiv.appendChild(newImg);
    // const testDiv = newDiv;
    // infospot.addHoverElement(testDiv, 200);

    // infospot.focus(1000, function (k) {
    //   return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    // });

    panoramas[currentPanoIndex].add(infospot);
    // console.log(currentPanoIndex);
    setInfospots(
      infospots.map((ele, index) =>
        index === currentPanoIndex ? [...ele, infospot] : [...ele]
      )
    );
  };
  return (
    <div id="test" style={{ border: "1px solid black" }}>
      <div>
        <div>tag 내용</div>
        <input
          type="text"
          value={infospotText}
          onChange={(e) => {
            setInfospotText(e.target.value);
          }}
        />
      </div>
      <button
        onClick={(e) => {
          if (infospotText === "") {
            alert("텍스트를 입력해주세요.");
            return;
          }
          console.log(currentPanoIndex);
          panoramas[currentPanoIndex].addEventListener(
            "click",
            function handler() {
              addTag(infospotText);
              this.removeEventListener("click", handler);
              setInfospotText("");
            }
          );
        }}
      >
        tag 생성
      </button>
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
    </div>
  );
};

export default InfospotEditor;
