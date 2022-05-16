import React, { useEffect, useState } from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";
import axios from "axios";

const PanoCreator = ({
  viewer,
  setViewer,
  panoramas,
  setPanoramas,
  infospots,
  setInfospots,
  location,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e) => {
    var reader = new FileReader();
    const img = e.target.files[0];

    reader.addEventListener(
      "load",
      async () => {
        const imageFile = new FormData();
        imageFile.append("images", e.target.files[0]);
        console.log("reader.result", reader.result);
        setIsLoading(true);
        await axios
          .post(process.env.REACT_APP_API_HOST + "/panoramas", imageFile, {
            headers: {
              "Content-Type": `multipart/form-data; `,
            },
          })
          .then(async () => {
            const data = await axios.get(
              process.env.REACT_APP_API_HOST + "/panoramas"
            );
            console.log("length", data.data.length);
            console.log("lastPanorama", data.data[data.data.length - 1]);
            const newPanorama = new PANOLENS.ImagePanorama(
              data.data[data.data.length - 1].photoURL
            );
            console.log(newPanorama);
            viewer.add(newPanorama);
            setPanoramas(
              panoramas.concat({
                _id: data.data[data.data.length - 1].id,
                panorama: newPanorama,
              })
            );
            setInfospots(infospots.concat([]));
            console.log("panoramas", panoramas);
            setIsLoading(false);
          });
      },
      false
    );

    if (img) {
      reader.readAsDataURL(img);
    }
  };
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: "0.5",
          color: "white",
        }}
      >
        파노라마 생성중..
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: "50px" }}>
      <label
        for="panorama_img"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffdd59",
          justifyContent: "center",
          alignItems: "center",
          color: "#4f4f4f",
        }}
      >
        파노라마 추가
      </label>
      <input
        type="file"
        id="panorama_img"
        onChange={onChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default PanoCreator;
