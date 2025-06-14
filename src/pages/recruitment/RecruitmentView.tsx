import { Box, Container } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import ChannelSlider from "./ChannelSlider";
import AboutSection from "./AboutSection";
import IPCardSection from "./IPCardSection";
import JobApplicationForm from "./JobApplicationForm";

type Props = {};

const RecruitmentView = ({ image }: any) => {
  return (
    <Box sx={{ background: "white" }}>
      <Banner image={image} />
      <AboutSection image={image} />
      <IPCardSection />
      <JobApplicationForm />
    </Box>
  );
};

export default RecruitmentView;
