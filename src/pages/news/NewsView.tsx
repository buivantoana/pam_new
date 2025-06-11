import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import img1 from "../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png";
import vector1 from "../../images/Vector (1).png";
import vector2 from "../../images/Vector (2).png";
import vector3 from "../../images/Vector (3).png";
import vector4 from "../../images/Vector.png";
import vector5 from "../../images/Element 8.png";
import vector6 from "../../images/khangia2.png";
import { useNavigate } from "react-router-dom";
import { formattedDateHHMMDDMMYYYY } from "../../utils/utils";
import { motion } from "framer-motion";
const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const NewsView = ({ posts, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 9;
  const filteredNews = posts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedNews = filteredNews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box
      pt={{ xs: "100px", md: "120px" }}
      sx={{
        py: 5,
        background: "linear-gradient(to bottom, #fff5f0, white)",
        position: "relative",
      }}>
      <Box
        component='img'
        src={vector2}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "50%",
          left: 0,
          width: isMobile ? 100 : "unset",
        }}
      />
      <Box
        component='img'
        src={vector1}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "5%",
          left: 0,
          width: isMobile ? 100 : "unset",
        }}
      />

      <Box
        component='img'
        src={vector4}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "10%",
          right: 0,
          width: isMobile ? 100 : "unset",
        }}
      />
      <Box
        component='img'
        src={vector5}
        alt='Avatar 1'
        sx={{
          display: isMobile ? "none" : "block",
          position: "absolute",
          top: isMobile ? 80 : "70%",
          right: 0,
          width: isMobile ? 100 : "unset",
        }}
      />

      <Container maxWidth='lg'>
        <Box
          display='flex'
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent='space-between'
          alignItems='center'
          mb={3}>
          <Typography variant='h3' fontWeight='bold' color='#FF6119'>
            Tin tức
          </Typography>
          <TextField
            placeholder='Search'
            size='small'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                background: "#f4f4f4",
              },
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton
                    variant='rectangular'
                    sx={{ borderRadius: 3 }}
                    height={250}
                  />
                  <Skeleton height={30} />
                  <Skeleton width='60%' />
                </Grid>
              ))
            : paginatedNews.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item._id}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      item.type == "job"
                        ? `/detail-recruitment?id=${item._id}`
                        : `/detail-new?id=${item._id}`
                    )
                  }>
                  <motion.div
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeSlideUp}>
                    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
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
                          sx={{ minHeight: 48, maxHeight: 100 }}>
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

        {/* Pagination */}
        {!loading && filteredNews.length > itemsPerPage && (
          <Box display='flex' justifyContent='center' mt={5}>
            <Pagination
              count={Math.ceil(filteredNews.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              shape='rounded'
              color='primary'
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NewsView;
