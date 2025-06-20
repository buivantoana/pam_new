import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  Container,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { RiTiktokFill } from "react-icons/ri";
import bannerRightBottom from "../../images/Group 1000003542.png";
import icon1 from "../../images/Vectorchanel.png";
import icon2 from "../../images/Group.png";
import icon3 from "../../images/Line element 2.png";
import icon4 from "../../images/icon-right2.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const Banner = ({ products }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate()
  return (
    <Box
      px={2}
      pt={isMobile ? 12 : "200px"}
      height={isMobile ? "auto" : "auto"}
      sx={{
        overflow: "hidden",
        background: "linear-gradient(to bottom, #fff5f0, white)",
        pb: 2,
      }}
      position='relative'>
      {/* Avatar Images */}
      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
        {/* Background Icons (giữ nguyên) */}
        {[icon1, icon2, icon2, icon3, icon4].map((src, i) => (
          <Box
            key={i}
            component='img'
            src={src}
            alt={`Avatar ${i}`}
            sx={{
              display: isMobile ? "none" : "block",
              position: "absolute",
              top:
                i === 0
                  ? "30%"
                  : i === 1
                  ? "0%"
                  : i === 2
                  ? "60%"
                  : i === 3
                  ? "55%"
                  : "-5%",
              left:
                i === 0 ? "45%" : i === 3 ? "2vw" : i === 4 ? "35%" : "auto",
              right: i === 1 ? "5vw" : i === 2 ? "0vw" : "auto",
              width: i === 1 ? "139px" : "unset",
            }}
          />
        ))}

        {/* Nội dung chính */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
            hidden: {},
          }}>
          <Box
            position={"relative"}
            zIndex={1}
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            gap={isMobile ? 3 : 0}
            justifyContent={"space-between"}>
            <motion.div variants={fadeInUp(0)}>
              <Typography
                variant='h1'
                fontWeight={700}
                sx={{
                  color: "#f26522",
                  fontSize: isMobile ? "26px" : "65px",
                  fontStyle: "italic",
                }}>
                {products && products.name ? products.name : " Lyly and Pam"}
              </Typography>
              <Typography
                maxWidth={600}
                my={4}
                mx='auto'
                fontSize={isMobile ? "12px" : "inherit"}>
                {products && products.description
                  ? products.description
                  : ` Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách
                PAM xây dựng một môi trường làm việc tử tế, tích cực và gắn kết.`}
              </Typography>
              <Typography variant='h5' fontWeight={"bold"}>
                Theo dõi và đăng ký
              </Typography>
              <Stack direction='row' spacing={2} justifyContent='start' mt={3}>
                {[FacebookIcon, YouTubeIcon, RiTiktokFill, InstagramIcon].map(
                  (IconComp, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.2, color: "#ff7043" }}
                      style={{ display: "inline-block" }}>
                      {IconComp === RiTiktokFill && (
                        <RiTiktokFill
                          onClick={()=>window.open(products?.socials?.tiktok, "_blank")}
                          style={{ fontSize: 28, color: "#FF5722" }}
                        />
                      )}
                      {IconComp === FacebookIcon && (
                        <FacebookIcon
                        onClick={()=>window.open(products?.socials?.facebook, "_blank")}
                          style={{ fontSize: 28, color: "#FF5722" }}
                        />
                      )}
                      {IconComp === YouTubeIcon && (
                        <YouTubeIcon
                        onClick={()=>window.open(products?.socials?.youtube, "_blank")}
                          style={{ fontSize: 28, color: "#FF5722" }}
                        />
                      )}
                      {IconComp === InstagramIcon && (
                        <InstagramIcon
                        onClick={()=>window.open(products?.socials?.instagram, "_blank")}
                          style={{ fontSize: 28, color: "#FF5722" }}
                        />
                      )}
                    </motion.div>
                  )
                )}
              </Stack>
            </motion.div>
            <motion.div variants={fadeInUp(0.2)}>
              <Box
                component='img'
                src={
                  products && products.avatar
                    ? products.avatar
                    : bannerRightBottom
                }
                alt='Avatar 4'
                sx={{ width: isMobile ? "100%" : "500px",borderRadius:"15px" }}
              />
            </motion.div>
          </Box>

          <motion.div variants={fadeInUp(0.4)}>
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                mt: isMobile ? 1 : 2,
              }}>
              <Grid
                container
                justifyContent='center'
                sx={{
                  background: "white",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: "0 0 8px #f26522",
                }}
                width={isMobile ? "100%" : "50%"}
                mt={6}>
                {[
                  { number: "50M+", label: "Người đăng kí" },
                  { number: "100+", label: "Videos" },
                  { number: "5B+", label: "Lượt xem" },
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
        </motion.div>
      </Container>
    </Box>
  );
};

export default Banner;
