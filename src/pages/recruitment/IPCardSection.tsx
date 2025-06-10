import React, { useEffect, useState } from "react";
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
  Skeleton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";

import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../service/post";
import { formattedDateHHMMDDMMYYYY } from "../../utils/utils";

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
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchAll()
  }, [])
  const fetchAll = async () => {
    setLoading(true);

    const resPosts = await getAllPosts({ type: "job" });
    if (resPosts && resPosts.status === 0) setPosts(resPosts.data);
    setLoading(false);
  };
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

      {loading
        ?
        <Grid container spacing={3}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant='rectangular' sx={{ borderRadius: 3 }} height={250} />
              <Skeleton height={30} />
              <Skeleton width='60%' />
            </Grid>
          ))}
        </Grid>
        : <Grid container spacing={3}>
          {posts && posts.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              sx={{cursor:"pointer"}}
              onClick={() => navigate(`/detail-recruitment?id=${item._id}`)}
              md={4}
              key={index}>
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
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{ width: 90, height: 90 }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      border: `1px solid #FF5722`,
                      color: "#FF5722",
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
                    <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ minHeight: 48, maxHeight: 100 }}
                        >
                          {item.summary.length > 100
                            ? item.summary.slice(0, 100) + "..."
                            : item.summary}
                        </Typography>
                    <Stack spacing={2}>
                      <Stat
                        text={"Hạn ứng tuyển"}
                        detail={formattedDateHHMMDDMMYYYY(item?.jobDetail?.deadline)}
                        color={"#FF5722"}
                      />
                      <Stat
                        text={"Số lượng"}
                        detail={item.qty}
                        color={"#FF5722"}
                      />
                      <Stat
                        text={"Hình thức làm việc"}
                        detail={item?.jobDetail?.jobType}
                        color={"#FF5722"}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>}

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
