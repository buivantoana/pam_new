import { Box, Container } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import AboutSection from "./AboutSection";
import ChannelSlider from "./ChannelSlider";
import PartnersSection from "./PartnersSection";

type Props = {};

const HomeView = (props: Props) => {
  return (
    <Box sx={{ background: "white" }}>
      <Banner />
      <AboutSection />
      <Container maxWidth='lg'>
        <ChannelSlider />
      </Container>
      <PartnersSection />
    </Box>
  );
};

export default HomeView;
