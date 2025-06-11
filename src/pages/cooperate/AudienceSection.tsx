import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

import image1 from "../../images/1.png";
import image2 from "../../images/2.png";
import image3 from "../../images/3.png";
import khangia1 from "../../images/khangia1.png";
import khangia2 from "../../images/khangia2.png";

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

const AudienceSection = ({ image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const audienceData = [
    {
      title: "Trẻ em",
      image: image?.cooperate?.image1 ? image?.cooperate?.image1 : image1,
    },
    {
      title: "Thanh thiếu niên và các thành viên trong gia đình",
      image: image?.cooperate?.image2 ? image?.cooperate?.image2 : image2,
    },
    {
      title: "Gen Z",
      image: image?.cooperate?.image3 ? image?.cooperate?.image3 : image3,
    },
  ];
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: "#fff8f6",
        py: 6,
        textAlign: "center",
        position: "relative",
      }}>
      {/* Floating decorative images */}
      {!isMobile && (
        <>
          <Box
            component={motion.img}
            variants={floatAnimation}
            animate='animate'
            src={khangia1}
            alt='decor1'
            sx={{
              position: "absolute",
              bottom: 50,
              left: 0,
            }}
          />
          <Box
            component={motion.img}
            variants={floatAnimation}
            animate='animate'
            src={khangia2}
            alt='decor2'
            sx={{
              position: "absolute",
              top: 50,
              left: 100,
            }}
          />
        </>
      )}

      <Typography
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        variant={isMobile ? "h6" : "h3"}
        fontWeight='500'
        mb={4}>
        Khán giả chính của{" "}
        <span style={{ color: "#f2784b", fontStyle: "italic" }}>Pam-Media</span>
        <span style={{ color: "#f2784b" }}>✨</span>
      </Typography>

      <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent='center'>
          {audienceData.map((audience, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: 3,
                    position: "relative",
                  }}>
                  <CardMedia
                    component='img'
                    image={audience.image}
                    alt={audience.title}
                    sx={{
                      height: { xs: 200, md: 400 },
                      filter: "brightness(0.6)",
                      borderRadius: "15px",
                    }}
                  />
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      width: "90%",
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: "0px !important",
                    }}>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {audience.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AudienceSection;
