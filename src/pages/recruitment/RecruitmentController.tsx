import React, { useEffect, useState } from "react";
import RecruitmentView from "./RecruitmentView";
import { getImageByName } from "../../service/manage_image";

type Props = {};

const RecruitmentController = (props: Props) => {
  let [image, setImage] = useState(null);
  useEffect(() => {
    getImage();
  }, []);

  let getImage = async () => {
    try {
      let result = await getImageByName("recruitment");
      if (result && result.status == 0) {
        setImage(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <RecruitmentView image={image} />;
};

export default RecruitmentController;
