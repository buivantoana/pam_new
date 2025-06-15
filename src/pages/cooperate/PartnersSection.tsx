import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

import patner from "../../images/Frame 1618871475.png";
import patner2 from "../../images/5fc8ac3fac36cdf9c9ecb71cab383e120ba78bf8.png";
import coo1 from "../../images/coo1.png";
import coo2 from "../../images/coo2.png";
import coo3 from "../../images/Vectorabout1.png";
import coo4 from "../../images/Vectorabout2.png";

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const PartnersSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      sx={{
        py: 5,
        textAlign: "center",
        background: "white",
        position: "relative",
        zIndex: 1,
      }}>
      {/* Floating background decorations */}
      {!isMobile && (
        <>
          <Box
            component={motion.img}
            variants={floatAnimation}
            animate='animate'
            src={coo1}
            alt='decor 1'
            sx={{
              position: "absolute",
              top: 100,
              left: 50,
            }}
          />
          <Box
            component={motion.img}
            variants={floatAnimation}
            animate='animate'
            src={coo2}
            alt='decor 2'
            sx={{
              position: "absolute",
              top: 300,
              left: 0,
            }}
          />
          <Box
            component={motion.img}
            variants={floatAnimation}
            animate='animate'
            src={coo3}
            alt='decor 3'
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
          <Box
            component={motion.img}
            variants={floatAnimation}
            animate='animate'
            src={coo4}
            alt='decor 4'
            sx={{
              position: "absolute",
              bottom: "-50px",
              right: 0,
            }}
          />
        </>
      )}

      <Typography
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        textAlign='center'
        variant={isMobile ? "h5" : "h4"}
        fontWeight={500}
        mb={4}>
        Đối tác kênh của{" "}
        <Box
          component='span'
          fontWeight={600}
          fontStyle='italic'
          color='#A2BF00'>
          Pam-Media
        </Box>
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent='center'
        alignItems='center'
        sx={{ mt: 3, px: 2 }}>
        <Grid item xs={12}>
          <Box
            component={motion.img}
            src={patner}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            sx={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              mx: "auto",
            }}
          />
        </Grid>
      </Grid>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        display={"flex"}
        my={3}
        justifyContent={"center"}>
        <img src={patner2} width={"60%"} alt='partner brands' />
      </Box>
    </Box>
  );
};

export default PartnersSection;
