import React from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";

const PanoCreator = ({
  viewer,
  panoramas,
  setPanoramas,
  infospots,
  setInfospots,
}) => {
  const onChange = (e) => {
    var reader = new FileReader();
    const img = e.target.files[0];
    reader.addEventListener(
      "load",
      () => {
        const panorama = new PANOLENS.ImagePanorama(reader.result);
        viewer.add(panorama);
        setPanoramas([...panoramas, panorama]);
      },
      false
    );

    if (img) {
      reader.readAsDataURL(img);
    }

    setInfospots([...infospots, []]);
  };
  return (
    <div style={{ border: "1px solid black" }}>
      <input type="file" name="panorama_img" onChange={onChange} />
    </div>
  );
};

export default PanoCreator;
