import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
  Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";

import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";

const data = [
  {
    title: "Lyly and Pam",
    image: img1,
    color: "#FF5722",
    subscribers: "Toàn thời gian",
    detail: "30/6/2023",
    qty: 1,
  },
  {
    title: "Baby Shark",
    image: img1,
    color: "#FF5722",
    subscribers: "Toàn thời gian",
    detail: "30/6/2023",
    qty: 1,
  },
  {
    title: "Adventure with John",
    image: img1,
    color: "#FF5722",
    subscribers: "Toàn thời gian",
    detail: "30/6/2023",
    qty: 1,
  },
];

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Stat = ({ text, color, detail }) => (
  <Stack direction='row' spacing={1} alignItems='center'>
    <Typography
      fontSize={14}
      color='black'
      sx={{ display: "flex", gap: 1, fontWeight: "bold", alignItems: "end" }}>
      {text} : <Typography color={color}>{detail}</Typography>
    </Typography>
  </Stack>
);

export default function IPCardSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        custom={0}>
        <Typography variant='h6' textAlign='center' fontWeight='bold' mb={4}>
          Hãy trở thành mảnh ghép và đồng hành cùng chúng tôi
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideUp}
              custom={index + 1} // Delay animation từng item
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "max-content",
                  position: "relative",
                  textAlign: "left",
                }}>
                <Avatar
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 90, height: 90 }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    border: `1px solid ${item.color}`,
                    color: item.color,
                  }}>
                  <ArrowForwardIosIcon fontSize='small' />
                </IconButton>
                <CardContent>
                  <Typography
                    variant='subtitle1'
                    fontWeight='bold'
                    color={"#A2BF00"}
                    gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' mb={2}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </Typography>
                  <Stack spacing={2}>
                    <Stat
                      text={"Hạn ứng tuyển"}
                      detail={item.detail}
                      color={item.color}
                    />
                    <Stat
                      text={"Số lượng"}
                      detail={item.qty}
                      color={item.color}
                    />
                    <Stat
                      text={"Hình thức làm việc"}
                      detail={item.subscribers}
                      color={item.color}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
        custom={data.length + 1}>
        <Box my={3} textAlign={"center"}>
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
            }}>
            Xem Thêm
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}
