import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Container, useTheme, useMediaQuery } from '@mui/material';
import icon1 from "../../images/icon1.png"
import icon2 from "../../images/icon2.png"
import icon3 from "../../images/icon3.png"
import icon4 from "../../images/icon4.png"
import icon5 from "../../images/icon5.png"
import icon6 from "../../images/icon6.png"
const contentItems = [
  {
    title: 'Live action',
    image: icon1, // Thay ảnh phù hợp nếu có
  },
  {
    title: 'Stop motion hand made',
    image: icon2,
  },
  {
    title: 'Music',
    image: icon3,
  },
  {
    title: '2D',
    image: icon4,
  },
  {
    title: 'Game',
    image: icon5,
  },
  {
    title: 'Animal',
    image: icon6,
  },
];

const TopContentSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{backgroundColor: '#fff8f6',}}>
    <Container maxWidth="lg" sx={{  py: 6, textAlign: 'center' }}>
    <Typography textAlign="center" variant={isMobile ? "h5" : "h3"} fontWeight={500} mb={4}>
               Nội dung {" "}
                <Box component="span" sx={{ fontFamily: `"Courgette", cursive` }} fontWeight={600} fontStyle="italic" color="#f26522">
                    hàng đầu
                </Box>
            </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto" mb={5}>
        Với năng lực công nghệ toàn diện, Pam Media tự tin trở thành đối tác đồng tin cậy, hoàn hảo
        và sự đa dạng với các kênh truyền thông.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {contentItems.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              sx={{
                borderRadius: 4,
                textAlign: 'center',
                backgroundColor: '#fff1ed',
                py: 3,
                px: 2,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ height:{ xs:100,md:180}, width: { xs:100,md:180}, mx: 'auto', mb: 2 }}
              />
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" fontWeight="700">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

    </Box>
  );
};

export default TopContentSection;
