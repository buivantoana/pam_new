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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import img1 from '../../images/f9ba8517ad4dadbc18b9e3832b3d8ac162433c9e.png';
const dummyNews = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  title: "Lorem Ipsum is simply dummy text...",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "05/06/2025",
  image: img1,
}));

const NewsView = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;
  const filteredNews = dummyNews.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedNews = filteredNews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box pt={{xs:"100px", md:"120px"}} sx={{  py: 5,  background: 'linear-gradient(to bottom, #fff5f0, white)' }}>
        <Container maxWidth="lg">

      <Box display="flex" flexDirection={{xs:"column",md:"row"}} justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h3" fontWeight="bold" color="#FF6119">
          Tin tức
        </Typography>
        <TextField
          placeholder="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
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
        {paginatedNews.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 2,padding:"0 !important" }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt="news image"
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>
                  {item.content}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  {item.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={5}>
        <Pagination
          count={Math.ceil(filteredNews.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          shape="rounded"
          color="primary"
        />
      </Box>
        </Container>
    </Box>
  );
};

export default NewsView;
