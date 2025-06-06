import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
  Button
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const data = [
  {
    title: "Lyly and Pam",
    image: "https://i.imgur.com/NCqY5cG.png",
    color: "#2ecc71",
    subscribers: "1M+ Người đăng ký",
    views: "500M+ Lượt xem",
    videos: "150M+ Videos",
  },
  {
    title: "Baby Shark",
    image: "https://i.imgur.com/hN0eZ2F.png",
    color: "#2ecc71",
    subscribers: "35M+ Người đăng ký",
    views: "1B+ Lượt xem",
    videos: "200M+ Videos",
  },
  {
    title: "Adventure with John",
    image: "https://i.imgur.com/ANXnvWh.png",
    color: "#27ae60",
    subscribers: "6M+ Người đăng ký",
    views: "800M+ Lượt xem",
    videos: "500M+ Videos",
  },
];

const Stat = ({ label, text, color }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Typography fontSize={14}>{label}</Typography> :
    <Typography color="#f26522" fontSize={14}>{text}</Typography>
  </Stack>
);

export default function IPCardSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ py: 4, }}>
      <Typography
        variant="h6"
        textAlign="center"
        fontWeight="bold"
        mb={4}
      >
        Hãy trở thành mảnh ghép và đồng hành cùng chúng tôi
      </Typography>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                height: "max-content",
                position: "relative",
                textAlign: "left",
              }}
            >
              <Avatar
                src={item.image}
                alt={item.title}
                sx={{ width: 90, height: 90, }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  border: `1px solid ${item.color}`,
                  color: item.color,
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color={"#A2BF00"}
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </Typography>
                <Stack spacing={2}>
                  <Stat label="Hạn ứng tuyển" text={item.subscribers} color={item.color} />
                  <Stat label="Số lượng" text={item.views} color={item.color} />
                  <Stat label="Hình thức làm việc" text={item.videos} color={item.color} />
                </Stack>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box my={3} textAlign={"center"}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 20,
            color: '#f26522',
            borderColor: '#f26522',
            px: 3,
            py: 1,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#f26522',
              color: 'white'
            }
          }}

        >
          Liên Hệ Ngay
        </Button>
      </Box>
    </Container>
  );
}
