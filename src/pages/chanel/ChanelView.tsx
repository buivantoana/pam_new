import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Banner from "./Banner";
import AboutSection from "./AboutSection";
import IPCardSection from "./IPCardSection";
import vector1 from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import vector3 from "../../images/Vector (3).png";
import vector4 from "../../images/Vector.png";
import vector5 from "../../images/Element 8.png";
import vector6 from "../../images/khangia2.png";
type Props = {};

const ChanelView = ({ products }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ background: "white", position: "relative" }}>
      <Box
        component='img'
        src={vector2}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "50%",
          left: 0,
          width: isMobile ? 100 : "unset",
          zIndex: 1,
        }}
      />
      <Box
        component='img'
        src={vector1}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "5%",
          left: 0,
          width: isMobile ? 100 : "unset",
          zIndex: 1,
        }}
      />

      <Box
        component='img'
        src={vector4}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "10%",
          right: 0,
          width: isMobile ? 100 : "unset",
          zIndex: 1,
        }}
      />
      <Box
        component='img'
        src={vector5}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "70%",
          right: 0,
          width: isMobile ? 100 : "unset",
          zIndex: 1,
        }}
      />

      <Banner products={products && products[0] ? products[0] : {}} />
      <Container maxWidth='lg' sx={{ bgcolor: "white" }}>
        <AboutSection products={products && products[1] ? products[1] : {}} />
      </Container>
      <IPCardSection products={products} />
    </Box>
  );
};

export default ChanelView;
