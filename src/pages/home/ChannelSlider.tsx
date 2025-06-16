import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";

// DUMMY images (replace with your real images)
import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img2 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img3 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img4 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img5 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img6 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";

const images = [img1, img2, img3, img4, img5, img6];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const ChannelSlider = ({ image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let [imageSlider, setImageSlider] = useState([]);
  useEffect(() => {
    if (
      image &&
      image.channelSliderImages &&
      image.channelSliderImages.length > 0
    ) {
      setImageSlider(
        image.channelSliderImages.map((item) => {
          if (!item) {
            return img1;
          }
          return item;
        })
      );
    } else {
      setImageSlider(images);
    }
  }, [image]);
  return (
    <Box py={6} px={2} sx={{ backgroundColor: "#fff" }}>
      {/* Tiêu đề */}
      <motion.div
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        <Typography
          textAlign='center'
          variant={isMobile ? "h5" : "h3"}
          fontWeight={500}
          mb={4}>
          Hệ thống Sản phẩm {" "}
          <Box
            component='span'
            sx={{}}
            fontWeight={600}
            fontStyle='italic'
            color='#f26522'>
            Pam-Media
          </Box>
        </Typography>
      </motion.div>

      {/* Swiper */}
      <motion.div
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        <Box mx='auto'>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            style={{ background: "white" }}
            centeredSlides={true}
            slidesPerView={isMobile ? 1 : 2.78}
            spaceBetween={isMobile ? 10 : "-20px"}
            initialSlide={3}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}>
            {imageSlider.map((src, index) => (
              <SwiperSlide key={index} style={{ height: "100%" }}>
                <motion.img
                  src={src}
                  alt={`slide-${index}`}
                  variants={fadeInUp}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  style={{
                    width: "100%",
                    height: isMobile ? "unset" : "500px",
                    borderRadius: 12,
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </motion.div>

      {/* Lyly and Pam section */}
      <motion.div
        variants={fadeInUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}>
        <Box
          display='flex'
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent='center'
          alignItems='center'
          my={7}
          gap={3}
          px={2}>
          <Box
            component='img'
            src={img6}
            alt=''
            sx={{
              width: { xs: 100, sm: 200 },
              height: { xs: 100, sm: 200 },
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <Box
            width={{ xs: "100%", sm: "60%" }}
            textAlign={{ xs: "center", sm: "left" }}>
            <Typography variant='h6' fontWeight={700} mb={2}>
              Lyly and Pam
            </Typography>
            <Typography color='#121212'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Necessitatibus rem, provident sint ex reiciendis minima eveniet
              omnis amet commodi enim? Labore, sed saepe. Veritatis repudiandae
              ratione deserunt placeat nobis. Mollitia.
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ChannelSlider;
