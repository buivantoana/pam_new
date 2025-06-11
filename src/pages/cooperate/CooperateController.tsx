import React, { useEffect, useState } from "react";
import CooperateView from "./CooperateView";
import { getImageByName } from "../../service/manage_image";

type Props = {};

const CooperateController = (props: Props) => {
  let [image, setImage] = useState(null);
  useEffect(() => {
    getImage();
  }, []);

  let getImage = async () => {
    try {
      let result = await getImageByName("cooperate");
      if (result && result.status == 0) {
        setImage(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <CooperateView image={image} />;
};

export default CooperateController;
