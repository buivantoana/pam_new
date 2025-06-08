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
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { RiTiktokFill } from "react-icons/ri";
import { motion } from "framer-motion";

import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";

const data = [
  {
    title: "Lyly and Pam",
    image: img1,
    color: "#FF5722",
    subscribers: "1M+ ",
    detail: " Người đăng ký",
    views: "500M+ Lượt xem",
    videos: "150M+ Videos",
  },
  {
    title: "Baby Shark",
    image: img1,
    color: "#FF5722",
    subscribers: "35M+",
    detail: " Người đăng ký",
    views: "1B+ Lượt xem",
    videos: "200M+ Videos",
  },
  {
    title: "Adventure with John",
    image: img1,
    color: "#FF5722",
    subscribers: "6M+",
    detail: " Người đăng ký",
    views: "800M+ Lượt xem",
    videos: "500M+ Videos",
  },
];

const Stat = ({ icon: Icon, text, color, detail }) => (
  <Stack direction='row' spacing={1} alignItems='center'>
    <Icon sx={{ color, fontSize: 18 }} />
    <Typography
      fontSize={14}
      color={color}
      sx={{ display: "flex", gap: 1, fontWeight: "bold" }}>
      {text} <Typography color='black'>{detail}</Typography>
    </Typography>
  </Stack>
);

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

export default function IPCardSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h6' textAlign='center' fontWeight='bold' mb={4}>
        Chúng tôi hoàn toàn có thể phù hợp với thương hiệu của bạn
        <br />
        với IP nổi tiếng thế giới của chúng tôi!
      </Typography>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              custom={index}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}>
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
                      icon={PeopleAltIcon}
                      text={item.subscribers}
                      detail={item.detail}
                      color={item.color}
                    />
                    <Stat
                      icon={VisibilityIcon}
                      text={item.views}
                      detail={item.detail}
                      color={item.color}
                    />
                    <Stat
                      icon={VideoLibraryIcon}
                      text={item.videos}
                      detail={item.detail}
                      color={item.color}
                    />
                  </Stack>
                  <Stack
                    direction='row'
                    spacing={2}
                    justifyContent='start'
                    mt={3}>
                    <FacebookIcon sx={{ fontSize: 25, color: "#FF5722" }} />
                    <YouTubeIcon sx={{ fontSize: 25, color: "#FF5722" }} />
                    <RiTiktokFill style={{ fontSize: 24, color: "#FF5722" }} />
                    <InstagramIcon sx={{ fontSize: 25, color: "#FF5722" }} />
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
