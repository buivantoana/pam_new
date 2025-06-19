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
import bg from "../../images/Mask group 1.png";
import { useNavigate } from "react-router-dom";

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

const Banner = ({ image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  return (
    <Box
      px={2}
      pt={isMobile ? 13 : "200px"}
      textAlign='center'
      height='auto'
      pb={isMobile ? 3 : 5}
      sx={{
        overflow: "hidden",
        background: `url("${bg}")`,
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: isMobile ? "unset" : "90vh",
      }}>
      {/* Background Images with Animation */}
      {[
        {
          src:
            image && image?.homeBanner?.bannerLeftTop
              ? image.homeBanner?.bannerLeftTop
              : bannerLeftTop,
          top: isMobile ? 100 : 100,
          left: isMobile ? 0 : 150,
          isCheck: image && image?.homeBanner?.bannerLeftTop,
        },
        { src: vector2, top: 300, left: 350, hiddenMobile: true },
        { src: icon_left, top: 120, left: 0, hiddenMobile: true },
        { src: icon_left1, bottom: 20, left: "2vw", hiddenMobile: true },
        { src: vector, bottom: 200, left: 0, hiddenMobile: true },
        {
          src:
            image && image?.homeBanner?.bannerLeftBottom
              ? image.homeBanner?.bannerLeftBottom
              : bannerLeftBottom,
          bottom: isMobile ? "40%" : 150,
          left: isMobile ? 0 : 130,
          isCheck: image && image?.homeBanner?.bannerLeftBottom,
        },
        {
          src:
            image && image?.homeBanner?.bannerRightTop
              ? image.homeBanner?.bannerRightTop
              : bannerRightTop,
          top: 80,
          right: isMobile ? 0 : 150,
          isCheck: image && image?.homeBanner?.bannerRightTop,
        },
        { src: icon_right1, top: 100, right: 360, hiddenMobile: true },
        { src: icon_right, top: 350, right: 0, hiddenMobile: true },
        { src: vector3, top: 150, right: 0, hiddenMobile: true },
        {
          src:
            image && image?.homeBanner?.bannerRightBottom
              ? image.homeBanner?.bannerRightBottom
              : bannerRightBottom,
          bottom: isMobile ? "40%" : 120,
          right: isMobile ? 0 : 150,
          isCheck: image && image?.homeBanner?.bannerRightBottom,
        },
      ].map((img, idx) => {
        const styles: any = {
          position: "absolute",
          width: isMobile ? 100 : img.isCheck ? "200px" : "unset",
          ...("top" in img && { top: img.top }),
          ...("bottom" in img && { bottom: img.bottom }),
          ...("left" in img && { left: img.left }),
          ...("right" in img && { right: img.right }),
          display: img.hiddenMobile && isMobile ? "none" : "block",
          borderRadius: img.isCheck ? "10px" : "unset",
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
          fontWeight={900}
          sx={{
            color: "#f26522",
            fontSize: isMobile ? "26px" : "70px",
            fontFamily: `"Inter", sans-serif`,
          }}>
          PAM MEDIA
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        style={{ position: "relative", zIndex: 1 }}
        custom={1}>
        <Typography
          variant='h3'
          sx={{ fontSize: isMobile ? "26px" : "65px", fontStyle: "italic" }}
          fontWeight={700}
          mt={1}>
          {image && image?.homeBanner?.title2
            ? image && image?.homeBanner?.title2
            : "Passion Awakens  Miracles"}
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
          {image && image?.homeBanner?.title2
            ? image && image?.homeBanner?.description
            : ` Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách PAM xây
          dựng một môi trường làm việc tử tế, tích cực và gắn kết.`}
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
            onClick={() => navigate("/contact")}
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
            mt: isMobile ? 1 : "150px",
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
