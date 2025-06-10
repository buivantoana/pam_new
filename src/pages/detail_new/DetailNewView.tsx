import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

import { motion } from "framer-motion";

import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import vector1 from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import vector4 from "../../images/Vector.png";
import vector5 from "../../images/Element 8.png";
import { formattedDateHHMMDDMMYYYY } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

type Props = {};



const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DetailNewView = ({postDetail,postRelato}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #fff5f0, white)",
        position: "relative",
      }}>
      {/* Animate các hình vector */}
      <motion.img
        src={vector2}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "50%",
          left: 0,
          width: isMobile ? 100 : undefined,
        }}
      />
      <motion.img
        src={vector1}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "5%",
          left: 0,
          width: isMobile ? 100 : undefined,
        }}
      />
      <motion.img
        src={vector4}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "10%",
          right: 0,
          width: isMobile ? 100 : undefined,
        }}
      />
      <motion.img
        src={vector5}
        alt='Avatar 1'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        style={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "70%",
          right: 0,
          width: isMobile ? 100 : undefined,
        }}
      />

      <Container maxWidth='lg'>
        <Box pt={{ xs: "100px", md: "200px" }}>
          {/* Animate tiêu đề */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeSlideUp}>
            <Typography variant='h1' color='#FF6119' fontWeight={"700"} mb={3}>
              {postDetail && postDetail.title}
            </Typography>
          </motion.div>

          {/* Không animation cho phần nội dung mô tả công việc */}
          <Typography fontSize={{ xs: "12px", md: "22px" }}>
          <Box sx={{
        }}   dangerouslySetInnerHTML={{ __html: postDetail && postDetail.content }} />
          </Typography>
        </Box>

        {/* Animate phần tiêu đề bài viết liên quan */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlideUp}>
          <Typography
            variant='h5'
            fontWeight={"700"}
            my={4}
            textAlign={"center"}>
            Các bài viết liên quan
          </Typography>
        </motion.div>

        {/* Animate các Card bài viết */}
        <Grid container spacing={3}>
          {postRelato.map((item) => (
            <Grid item xs={12} sx={{cursor:"pointer"}}  onClick={() => navigate(`/detail-new?id=${item._id}`)} sm={6} md={4} key={item.id}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeSlideUp}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    padding: "0 !important",
                  }}>
                  <CardMedia
                    component='img'
                    height='200'
                    image={item.imageUrl}
                    alt='news image'
                  />
                  <CardContent>
                    <Typography
                      variant='subtitle1'
                      fontWeight={600}
                      gutterBottom
                      noWrap>
                      {item.title}
                    </Typography>
                    <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ minHeight: 48,maxHeight:100 }}>
                    {item.summary.length > 100
                      ? item.summary.slice(0, 100) + "..."
                      : item.summary} 
                  </Typography>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{ display: "block", mt: 1 }}>
                      {formattedDateHHMMDDMMYYYY(item.publishedAt)}
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

export default DetailNewView;
