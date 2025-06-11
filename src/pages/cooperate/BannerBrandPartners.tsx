import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import banner from "../../images/1fa47c58664fc06c9fc374d0ccb62914013f9d63.png";

const BannerBrandPartners = ({ image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "100%", md: "450px" },
        backgroundImage: `url('${
          image?.cooperate?.topImage ? image?.cooperate?.topImage : banner
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        px: isMobile ? 0 : 2,
        py: isMobile ? 3 : 0,
      }}>
      {/* Overlay làm mờ nền */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Nội dung */}
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        sx={{ zIndex: 2 }}>
        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variant={isMobile ? "h6" : "h4"}
          fontWeight='bold'
          mb={2}>
          Đối tác thương hiệu
        </Typography>

        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          variant={isMobile ? "body2" : "body1"}
          mb={1}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy.
        </Typography>

        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          variant={isMobile ? "body2" : "body1"}
          mb={1}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy.
        </Typography>
      </Container>
    </Box>
  );
};

export default BannerBrandPartners;
