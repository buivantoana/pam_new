import { Box, Container } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import AboutSection from "./AboutSection";
import ChannelSlider from "./ChannelSlider";
import PartnersSection from "./PartnersSection";

const HomeView = ({ image }: any) => {
  return (
    <Box sx={{ background: "white" }}>
      <Banner />
      <AboutSection image={image} />
      <Container maxWidth='lg'>
        <ChannelSlider image={image} />
      </Container>
      <PartnersSection />
    </Box>
  );
};

export default HomeView;
