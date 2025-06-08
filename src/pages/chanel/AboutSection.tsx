import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AboutImage2 from "../../images/imagechanel.png";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box py={isMobile ? 2 : 8} bgcolor={"white"}>
      <Grid container spacing={isMobile ? 6 : 5} alignItems='start'>
        <Grid
          item
          xs={12}
          md={6}
          textAlign='center'
          order={{ xs: 3, md: 2 }}
          component={motion.div}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}>
          <Box
            component='img'
            src={AboutImage2}
            alt='Pam Party'
            sx={{ maxWidth: "100%", borderRadius: 3, boxShadow: 3 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 2, md: 3 }}
          component={motion.div}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}>
          <Box mb={2}>
            <Typography
              variant='h1'
              fontSize={{ xs: "34px", md: "64px" }}
              fontWeight={"bold"}>
              Lorem Ipsum simply dummy.
            </Typography>
          </Box>
          <Typography color='textSecondary' mb={3}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutSection;
