import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import bannerLeftTop from "../../images/Group 1171275715.png";
import bannerLeftBottom from "../../images/Group 1171275712.png";
import bannerRightTop from "../../images/Group 1171275716.png";
import bannerRightBottom from "../../images/Group 1171275714.png";

import icon_left from "../../images/icon-left.png";
import icon_left1 from "../../images/icon-left1.png";
import vector from "../../images/Vector-left.png";
import vector2 from "../../images/Vector-left3.png";
import icon_right from "../../images/icon-right.png";
import icon_right1 from "../../images/icon-right2.png";
import vector3 from "../../images/Vectorright.png";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const floatImage = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3 + i * 0.1, duration: 1, ease: "easeOut" },
  }),
};

const Banner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      px={2}
      pt={isMobile ? 13 : "200px"}
      textAlign='center'
      height='auto'
      pb={isMobile ? 3 : 5}
      sx={{
        overflow: "hidden",
        background: "linear-gradient(to bottom, #fff5f0, white)",
        position: "relative",
      }}>
      {/* Background Images with Animation */}
      {[
        {
          src: bannerLeftTop,
          top: isMobile ? 100 : 100,
          left: isMobile ? 0 : 150,
        },
        { src: vector2, top: 300, left: 350, hiddenMobile: true },
        { src: icon_left, top: 120, left: 0, hiddenMobile: true },
        { src: icon_left1, bottom: 20, left: "2vw", hiddenMobile: true },
        { src: vector, bottom: 200, left: 0, hiddenMobile: true },
        {
          src: bannerLeftBottom,
          bottom: isMobile ? "40%" : 150,
          left: isMobile ? 0 : 130,
        },
        { src: bannerRightTop, top: 80, right: isMobile ? 0 : 150 },
        { src: icon_right1, top: 100, right: 360, hiddenMobile: true },
        { src: icon_right, top: 350, right: 0, hiddenMobile: true },
        { src: vector3, top: 150, right: 0, hiddenMobile: true },
        {
          src: bannerRightBottom,
          bottom: isMobile ? "40%" : 120,
          right: isMobile ? 0 : 150,
        },
      ].map((img, idx) => {
        const styles: any = {
          position: "absolute",
          width: isMobile ? 100 : "unset",
          ...("top" in img && { top: img.top }),
          ...("bottom" in img && { bottom: img.bottom }),
          ...("left" in img && { left: img.left }),
          ...("right" in img && { right: img.right }),
          display: img.hiddenMobile && isMobile ? "none" : "block",
        };
        return (
          <motion.img
            key={idx}
            src={img.src}
            alt={`img-${idx}`}
            style={styles}
            variants={floatImage}
            initial='hidden'
            animate='visible'
            custom={idx}
          />
        );
      })}

      {/* Text Content */}
      <motion.div
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        custom={0}>
        <Typography
          variant='h1'
          fontWeight={700}
          sx={{
            color: "#f26522",
            fontSize: isMobile ? "26px" : "65px",
            fontFamily: `"Courgette", cursive`,
          }}>
          PAM MEDIA
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        custom={1}>
        <Typography
          variant='h3'
          sx={{ fontSize: isMobile ? "26px" : "65px", fontStyle: "italic" }}
          fontWeight={700}
          mt={1}>
          Passion Awakens <br /> Miracles
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        custom={2}>
        <Typography
          maxWidth={600}
          my={4}
          mx='auto'
          fontSize={isMobile ? "12px" : "inherit"}>
          Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách PAM xây
          dựng một môi trường làm việc tử tế, tích cực và gắn kết.
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        custom={3}>
        <Box mt={4}>
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

      {/* Stats */}
      <motion.div
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        custom={4}>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            mt: isMobile ? 1 : 3,
          }}>
          <Grid
            container
            justifyContent='center'
            sx={{
              background: "white",
              borderRadius: 2,
              padding: 3,
              boxShadow: "0 0 8px #f26522",
            }}
            width={isMobile ? "100%" : "55%"}
            mt={6}>
            {[
              { number: "5+", label: "Kinh nghiệm" },
              { number: "150+", label: "Thành viên" },
              { number: "50M+", label: "Người đăng kí" },
              { number: "100+", label: "Kênh truyền hình" },
              { number: "5B+", label: "Lượt xem mỗi năm" },
            ].map((item, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={2}
                key={index}
                sx={{
                  textAlign: "center",
                  borderLeft:
                    !isMobile && index !== 0 ? "2px solid #ddd" : "none",
                  ml: !isMobile && index !== 0 ? 3 : 0,
                }}>
                <Typography variant='h5' fontWeight={700} color='#f26522'>
                  {item.number}
                </Typography>
                <Typography variant='body2'>{item.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Banner;
