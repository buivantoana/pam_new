import React, { useEffect, useState } from "react";
import HomeView from "./HomeView";
import { getImageByName } from "../../service/manage_image";

type Props = {};

const HomeComtroller = (props: Props) => {
  let [image, setImage] = useState(null);
  useEffect(() => {
    getImage();
  }, []);

  let getImage = async () => {
    try {
      let result = await getImageByName("home");
      if (result && result.status == 0) {
        setImage(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <HomeView image={image} />;
};

export default HomeComtroller;
