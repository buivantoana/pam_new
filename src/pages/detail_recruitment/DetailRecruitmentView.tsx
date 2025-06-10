import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

import IPCardSection from "./IPCardSection";
import JobApplicationForm from "./JobApplicationForm";
import vector1 from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import vector3 from "../../images/Vector (3).png";
import vector4 from "../../images/Vector.png";
import vector5 from "../../images/Element 8.png";
import vector6 from "../../images/khangia2.png";
type Props = {};

const DetailRecruitmentView = ({postDetail}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #fff5f0, white)",
        position: "relative",
      }}>
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
        }}
      />
      <Box
        component='img'
        src={vector3}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "20%",
          left: "70vw",
          width: isMobile ? 100 : "unset",
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
        }}
      />
      <Box
        component='img'
        src={vector6}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "40%",
          right: "5vw",
          width: isMobile ? 100 : "unset",
        }}
      />
      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
        <Box pt={{ xs: "100px", md: "200px" }}>
          <Typography variant='h1' color='#FF6119' fontWeight={"700"} mb={3}>
            {postDetail?.title}
          </Typography>
          <Box sx={{
        }}   dangerouslySetInnerHTML={{ __html: postDetail && postDetail.content }} />
          <Typography fontSize={{ xs: "12px", md: "22px" }}>
           
          </Typography>
        </Box>
      </Container>
      <JobApplicationForm />
      <IPCardSection />
    </Box>
  );
};

export default DetailRecruitmentView;
