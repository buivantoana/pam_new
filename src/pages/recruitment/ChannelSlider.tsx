import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

// DUMMY images (replace with your real images)
import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img2 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img3 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img4 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import img5 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";

const images = [img1, img2, img3, img4, img5];

const ChannelSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box py={6} >
      <Box>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={isMobile ? 1 : 5}
          // loopAdditionalSlides={images.length}
          spaceBetween={isMobile ? 10 : "-20px"}
          initialSlide={2}
          // loop={true} // 👈 cho phép lặp lại
          // autoplay={{
          //     delay: 3000,      // ⏱ 3s chuyển ảnh
          //     disableOnInteraction: false, // vẫn chạy sau khi người dùng swipe
          // }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow]}>
          {images.map((src, index) => (
            <SwiperSlide key={index} style={{ height: "100%" }}>
              <Box sx={{ height: "100%" }}>
                <Box
                  component='img'
                  src={src}
                  alt={`slide-${index}`}
                  sx={{
                    height: isMobile ? "unset" : "400px",

                    borderRadius: 3,
                    objectFit: "cover",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ChannelSlider;
