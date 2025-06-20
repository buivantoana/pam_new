import { Box, Container } from "@mui/material";
import React, { useRef } from "react";
import Banner from "./Banner";
import ChannelSlider from "./ChannelSlider";
import AboutSection from "./AboutSection";
import IPCardSection from "./IPCardSection";
import JobApplicationForm from "./JobApplicationForm";

type Props = {};

const RecruitmentView = ({ image }: any) => {
  const targetRef = useRef(null);

  // Hàm xử lý khi nhấn nút để scroll
  const handleScroll = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Box sx={{ background: "white" }}>
      <Banner image={image} />
      <AboutSection handleScroll={handleScroll} image={image} />
      <IPCardSection />
      <JobApplicationForm targetRef={targetRef} />
    </Box>
  );
};

export default RecruitmentView;
