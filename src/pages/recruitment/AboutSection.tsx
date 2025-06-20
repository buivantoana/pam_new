import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AboutImage1 from "../../images/imagereq.png";
import AboutImage2 from "../../images/imagereq2.png";
import AboutImage3 from "../../images/Group 1171275690.png";
import AboutImage4 from "../../images/Group 1171275691.png";
import vector1 from "../../images/Vectorabout1.png";
import vector2 from "../../images/Vectorabout2.png";
import vector3 from "../../images/khangia1.png";
import group from "../../images/Group.png";
import { RiCheckFill } from "react-icons/ri";
import { motion } from "framer-motion";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, delay },
  },
});

const AboutSection = ({ image ,handleScroll}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ position: "relative", my: 10 }}>
      {/* Animated Background Images */}
      <motion.img
        src={vector1}
        alt='Vector 1'
        style={{
          position: "absolute",
          top: isMobile ? 80 : 200,
          right: 0,
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("right", 0.1)}
      />
      <motion.img
        src={vector2}
        alt='Vector 2'
        style={{
          position: "absolute",
          bottom: isMobile ? 80 : 100,
          right: "5vw",
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("right", 0.2)}
      />
      <motion.img
        src={group}
        alt='Group'
        style={{
          position: "absolute",
          top: isMobile ? 80 : 20,
          left: "48vw",
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("up", 0.3)}
      />
      <motion.img
        src={vector3}
        alt='Vector 3'
        style={{
          position: "absolute",
          bottom: isMobile ? 80 : "20%",
          left: 0,
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("left", 0.4)}
      />

      <Container maxWidth='lg' sx={{ position: "relative" }}>
        <Box py={isMobile ? 2 : 8} sx={{ position: "relative" }}>
          <Grid container spacing={isMobile ? 6 : 5} alignItems='center'>
            <Grid item xs={12} md={6}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeIn("up", 0.2)}>
                <Box mb={2}>
                  {/* <img src={AboutImage4} width='100%' /> */}
                  { image && image?.recruitment?.title3 ?<Typography
                    fontWeight={"bold"}
                    fontSize={isMobile ? "35px" : "64px"}>
                   {image && image?.recruitment?.title3}
                    <Typography
                      fontSize={isMobile ? "35px" : "64px"}
                      fontWeight={"bold"}
                     
                      sx={{ fontFamily: `"Inter", sans-serif`}}
                      color='rgba(255, 97, 25, 1)'>
                      Pam Media
                    </Typography>
                  </Typography> :
                  <Typography
                    fontWeight={"bold"}
                    fontSize={isMobile ? "35px" : "64px"}>
                    Nghề nghiệp tại <br />{" "}
                    <Typography
                      fontSize={isMobile ? "35px" : "64px"}
                      fontWeight={"bold"}
                     
                      sx={{ fontFamily: `"Inter", sans-serif`}}
                      color='rgba(255, 97, 25, 1)'>
                      Pam Media
                    </Typography>
                  </Typography>}
                </Box>
                <Typography color='textSecondary' mb={3}>
                {image && image?.recruitment?.description2 ?image && image?.recruitment?.description2 :`Lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.`}
                </Typography>
                <Button
                onClick={handleScroll}
                  variant='outlined'
                  sx={{
                    borderRadius: 20,
                    color: "#f26522",
                    borderColor: "#f26522",
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#f26522",
                      color: "white",
                    },
                  }}
                  endIcon={<ArrowForwardIcon />}>
                  Ứng tuyển ngay
                </Button>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} textAlign='center'>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeIn("up", 0.3)}>
                <Box
                  component='img'
                  src={
                    image?.recruitment?.rightImage1
                      ? image?.recruitment?.rightImage1
                      : AboutImage1
                  }
                  alt='PAM Image'
                  sx={{ maxWidth: "100%", borderRadius: 3, boxShadow: 3 }}
                />
              </motion.div>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              textAlign='center'
              order={{ xs: 3, md: 2 }}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeIn("up", 0.4)}>
                <Box
                  component='img'
                  src={
                    image?.recruitment?.leftImage2
                      ? image?.recruitment?.leftImage2
                      : AboutImage2
                  }
                  alt='Pam Party'
                  sx={{
                    maxWidth: "100%",
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 2, md: 3 }}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                variants={fadeIn("up", 0.5)}>
                <Box mb={2}>
                  {/* <img src={AboutImage3} width='100%' /> */}
                  { image && image?.recruitment?.title4 ? <Typography
                    fontWeight={"bold"}
                    fontSize={isMobile ? "35px" : "64px"}>
                   { image && image?.recruitment?.title4}
                    <br /> tại{" "}
                    <Typography
                      variant='span'
                      fontSize={isMobile ? "35px" : "64px"}
                      fontWeight={"bold"}
                      sx={{ fontFamily: `"Inter", sans-serif`}}
                      color='rgba(162, 191, 0, 1)'>
                      Pam Media
                    </Typography>
                  </Typography> : <Typography
                    fontWeight={"bold"}
                    fontSize={isMobile ? "35px" : "64px"}>
                    Ưu điểm làm việc
                    <br /> tại{" "}
                    <Typography
                      variant='span'
                      fontSize={isMobile ? "35px" : "64px"}
                      fontWeight={"bold"}
                      sx={{ fontFamily: `"Inter", sans-serif`}}
                      color='rgba(162, 191, 0, 1)'>
                      Pam Media
                    </Typography>
                  </Typography>}
                </Box>
                <Box display={"flex"} flexDirection={"column"} mb={3} gap={2}>
                {image && image?.recruitment?.description3 ?image && <Typography color='textSecondary' mb={3}>
                  { image?.recruitment?.description3}
                </Typography> :
                <>
                {[ "Thu nhập cao theo năng lực",
                "Môi trường làm việc Gen z năng động",
                "Cơ hội thăng tiến trong công việc",
              ].map((text, i) => (
                <Typography
                  key={i}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}>
                  <RiCheckFill color='rgba(255, 97, 25, 1)' />
                  <Typography>{text}</Typography>
                </Typography>
              ))}
                
                </>}
                 
                </Box>
                <Button
                onClick={handleScroll}
                  variant='outlined'
                  sx={{
                    borderRadius: 20,
                    color: "#f26522",
                    borderColor: "#f26522",
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#f26522",
                      color: "white",
                    },
                  }}
                  endIcon={<ArrowForwardIcon />}>
                  Ứng tuyển ngay
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
