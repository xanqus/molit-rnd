import { useEffect } from "react";
import * as PANOLENS from "../../node_modules/panolens/build/panolens";

const Viewer = ({ setViewer }) => {
  useEffect(() => {
    // panorama1.setLinkingImage("/assets/1.JPG", 200);
    // panorama1.link(panorama2, new THREE.Vector3(1000, 1000, 1000));

    // panorama2.link(panorama3, new THREE.Vector3(1000, 1000, 1000));
    // panorama3.link(panorama1, new THREE.Vector3(1000, 1000, 1000));

    const viewer = new PANOLENS.Viewer({
      container: document.querySelector("#coucou"),
      output: "test",
    });

    setViewer(viewer);
  }, [setViewer]);

  return (
    <>
      <div
        id="coucou"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    </>
  );
};

export default Viewer;
