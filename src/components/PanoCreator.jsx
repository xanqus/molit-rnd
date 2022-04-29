import React, { useEffect } from "react";
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
  const onChange = (e) => {
    var reader = new FileReader();
    const img = e.target.files[0];

    reader.addEventListener(
      "load",
      async () => {
        const imageFile = new FormData();
        imageFile.append("images", e.target.files[0]);
        console.log("reader.result", reader.result);

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
          });
      },
      false
    );

    if (img) {
      reader.readAsDataURL(img);
    }
  };
  return (
    <div>
      <input type="file" name="panorama_img" onChange={onChange} />
    </div>
  );
};

export default PanoCreator;
