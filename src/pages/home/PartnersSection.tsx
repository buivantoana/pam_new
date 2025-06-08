import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import patner from "../../images/Frame 1618871475.png";

const PartnersSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      sx={{
        backgroundColor: "#fff8f6",
        py: 5,
        textAlign: "center",
      }}>
      <Typography
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        textAlign='center'
        variant={isMobile ? "h5" : "h3"}
        fontWeight={500}
        mb={4}>
        Đối tác kênh của{" "}
        <Box
          component='span'
          sx={{ fontFamily: `"Courgette", cursive` }}
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
    </Box>
  );
};

export default PartnersSection;
