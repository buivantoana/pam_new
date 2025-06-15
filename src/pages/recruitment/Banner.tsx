import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChannelSlider from "./ChannelSlider";
import { motion } from "framer-motion";

import icon_left from "../../images/icon-left.png";
import icon_left1 from "../../images/icon-left1.png";
import vector from "../../images/Vector-left.png";
import icon_right from "../../images/icon-right.png";
import icon_right1 from "../../images/icon-right2.png";

const fadeIn = (direction = "up", delay = 0) => {
  const variants = {
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
  };
  return variants;
};

const Banner = ({ image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      px={2}
      pt={isMobile ? 14 : "150px"}
      pb={2}
      textAlign='center'
      sx={{
        overflow: "hidden",
        background: "linear-gradient(to bottom, #fff5f0, white)",
      }}
      position='relative'>
      {/* Animated Background Images */}
      <motion.img
        src={icon_left}
        alt='Left Icon'
        style={{
          position: "absolute",
          top: isMobile ? 80 : 120,
          left: 0,
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("left", 0.1)}
      />
      <motion.img
        src={icon_left1}
        alt='Left Icon 2'
        style={{
          position: "absolute",
          bottom: isMobile ? 80 : 20,
          left: "2vw",
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("left", 0.2)}
      />
      <motion.img
        src={vector}
        alt='Vector Left'
        style={{
          position: "absolute",
          bottom: isMobile ? 80 : 200,
          left: 0,
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("left", 0.3)}
      />
      <motion.img
        src={icon_right1}
        alt='Right Icon'
        style={{
          position: "absolute",
          top: isMobile ? 80 : 100,
          right: isMobile ? -20 : 360,
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("right", 0.4)}
      />
      <motion.img
        src={icon_right}
        alt='Right Icon 2'
        style={{
          position: "absolute",
          top: isMobile ? 80 : 350,
          right: 0,
          width: isMobile ? 100 : "unset",
          display: isMobile ? "none" : "block",
        }}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("right", 0.5)}
      />

      {/* Title */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("up", 0.3)}>
        <Typography
          variant='h2'
          sx={{ fontSize: isMobile ? "26px" : "65px" }}
          fontWeight={700}
          mt={1}>
          Môi trường văn <br /> hóa tại{" "}
          <span
            style={{
              fontWeight: "700",
              color: "#f26522",
              fontSize: isMobile ? "26px" : "65px",
              fontStyle: "italic",
            }}>
            Pam-Media
          </span>
        </Typography>
      </motion.div>

      {/* Subtext */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("up", 0.5)}>
        <Typography
          maxWidth={600}
          my={2}
          mx='auto'
          fontSize={isMobile ? "12px" : "inherit"}>
          Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách PAM xây
          dựng một môi trường làm việc tử tế, tích cực và gắn kết.
        </Typography>
      </motion.div>

      {/* Slider */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("up", 0.7)}>
        <Container maxWidth='lg'>
          <ChannelSlider image={image} />
        </Container>
      </motion.div>

      {/* Button */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeIn("up", 0.9)}>
        <Box mt={2}>
          <Button
            variant='contained'
            size='large'
            sx={{
              backgroundColor: "#f26522",
              borderRadius: 999,
              px: isMobile ? 2 : 4,
              py: isMobile ? 1 : 1.5,
              fontWeight: 600,
              fontSize: isMobile ? ".8rem" : "1rem",
              boxShadow: "0 4px 14px rgba(242, 101, 34, 0.4)",
              "&:hover": {
                backgroundColor: "#e6541b",
              },
            }}
            endIcon={<ArrowForwardIcon />}>
            Liên Hệ Ngay
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Banner;
