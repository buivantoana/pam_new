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
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import AboutImage1 from "../../images/Group 1171275683.png";
import AboutImage2 from "../../images/image.png";
import AboutImage3 from "../../images/Group 1171275685.png";
import AboutImage4 from "../../images/Header.png";
import vector1 from "../../images/Vectorabout1.png";
import vector2 from "../../images/Vectorabout2.png";
import vector3 from "../../images/Vectorabout3.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const floatIn = (delay = 0) => ({
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay },
  },
});

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ position: "relative" }}>
      {/* Animated Background Icons */}
      <motion.img
        src={vector1}
        alt='vector1'
        variants={floatIn(0)}
        initial='hidden'
        animate='visible'
        style={{
          position: "absolute",
          top: isMobile ? 80 : 200,
          right: 0,
          width: isMobile ? 100 : "unset",
        }}
      />

      <motion.img
        src={vector2}
        alt='vector2'
        variants={floatIn(0.5)}
        initial='hidden'
        animate='visible'
        style={{
          position: "absolute",
          bottom: isMobile ? 80 : 100,
          right: "5vw",
          width: isMobile ? 100 : "unset",
        }}
      />

      {!isMobile && (
        <motion.img
          src={vector3}
          alt='vector3'
          variants={floatIn(1)}
          initial='hidden'
          animate='visible'
          style={{
            position: "absolute",
            top: "20%",
            left: "40vw",
          }}
        />
      )}

      <Container maxWidth='lg' sx={{ position: "relative" }}>
        <Box py={isMobile ? 2 : 8} sx={{ position: "relative" }}>
          <Grid container spacing={isMobile ? 6 : 5} alignItems='center'>
            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}>
                <Box mb={2} width={isMobile ? "60%" : "60%"}>
                  <img src={AboutImage4} width={"100%"} />
                </Box>
                <Typography color='textSecondary' mb={3}>
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </Typography>
                <Button
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
                  Liên Hệ Ngay
                </Button>
              </motion.div>
            </Grid>

            {/* RIGHT IMAGE */}
            <Grid item xs={12} md={6} textAlign='center'>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}>
                <Box
                  component='img'
                  src={AboutImage1}
                  alt='PAM Image'
                  sx={{ maxWidth: "100%", borderRadius: 3, boxShadow: 3 }}
                />
              </motion.div>
            </Grid>

            {/* IMAGE LEFT */}
            <Grid
              item
              xs={12}
              md={6}
              textAlign='center'
              order={{ xs: 3, md: 2 }}>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}>
                <Box
                  component='img'
                  src={AboutImage2}
                  alt='Pam Party'
                  sx={{ maxWidth: "100%", borderRadius: 3, boxShadow: 3 }}
                />
              </motion.div>
            </Grid>

            {/* TEXT RIGHT */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 3 }}>
              <motion.div
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}>
                <Box mb={2} width={isMobile ? "60%" : "60%"}>
                  <img src={AboutImage3} width={"100%"} />
                </Box>
                <Typography color='textSecondary' mb={3}>
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </Typography>
                <Button
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
                  Liên Hệ Ngay
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
