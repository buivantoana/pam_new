import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

import icon1 from "../../images/icon1.png";
import icon2 from "../../images/icon2.png";
import icon3 from "../../images/icon3.png";
import icon4 from "../../images/icon4.png";
import icon5 from "../../images/icon5.png";
import icon6 from "../../images/icon6.png";
import noidung from "../../images/noidung.png";

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

const TopContentSection = ({ image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const contentItems = [
    {
      title: image?.cooperate?.title4
        ? image?.cooperate?.title4
        : "Live action",
      image: image?.cooperate?.image4 ? image?.cooperate?.image4 : icon1,
    },
    {
      title: image?.cooperate?.title5
        ? image?.cooperate?.title5
        : "Stop motion hand made",
      image: image?.cooperate?.image5 ? image?.cooperate?.image5 : icon2,
    },
    {
      title: image?.cooperate?.title6 ? image?.cooperate?.title6 : "Music",
      image: image?.cooperate?.image6 ? image?.cooperate?.image6 : icon3,
    },
    {
      title: image?.cooperate?.title7 ? image?.cooperate?.title7 : "2D",
      image: image?.cooperate?.image7 ? image?.cooperate?.image7 : icon4,
    },
    {
      title: image?.cooperate?.title8 ? image?.cooperate?.title8 : "Game",
      image: image?.cooperate?.image8 ? image?.cooperate?.image8 : icon5,
    },
    {
      title: image?.cooperate?.title9 ? image?.cooperate?.title9 : "Animal",
      image: image?.cooperate?.image9 ? image?.cooperate?.image9 : icon6,
    },
  ];
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      sx={{ backgroundColor: "#fff8f6", position: "relative" }}>
      {!isMobile && (
        <Box
          component={motion.img}
          src={noidung}
          alt='decor'
          variants={floatAnimation}
          animate='animate'
          sx={{
            position: "absolute",
            top: 50,
            right: 0,
          }}
        />
      )}

      <Container maxWidth='lg' sx={{ py: 6, textAlign: "center" }}>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          textAlign='center'
          variant={isMobile ? "h5" : "h3"}
          fontWeight={500}
          mb={4}>
          Nội dung{" "}
          <Box
            component='span'
            fontWeight={600}
            fontStyle='italic'
            color='#f26522'>
            hàng đầu
          </Box>
        </Typography>

        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          variant='body1'
          color='text.secondary'
          maxWidth={600}
          mx='auto'
          mb={5}>
          Với năng lực công nghệ toàn diện, Pam Media tự tin trở thành đối tác
          đồng tin cậy, hoàn hảo và sự đa dạng với các kênh truyền thông.
        </Typography>

        <Grid container spacing={3} justifyContent='center'>
          {contentItems.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: "center",
                    backgroundColor: "#fff1ed",
                    py: 3,
                    px: 2,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                  }}>
                  <CardMedia
                    component='img'
                    image={item.image}
                    alt={item.title}
                    sx={{
                      height: { xs: 100, md: 180 },
                      width: { xs: 100, md: 180 },
                      mx: "auto",
                      mb: 2,
                    }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant='h6' fontWeight='700'>
                      {item.title}
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

export default TopContentSection;
