import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Container } from '@mui/material';
import image1 from "../../images/1.png"
import image2 from "../../images/2.png"
import image3 from "../../images/3.png"
const audienceData = [
    {
        title: 'Trẻ em',
        image: image1, // Thay bằng ảnh thực tế nếu có
    },
    {
        title: 'Thanh thiếu niên và các thành viên trong gia đình',
        image: image2,
    },
    {
        title: 'Gen Z',
        image: image3,
    },
];

const AudienceSection = () => {
    return (
        <Box sx={{ backgroundColor: '#fff8f6', py: 6, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="500" mb={4}>
                Khán giả chính của <span style={{ color: '#f2784b', fontStyle: 'italic' }}>Pam-Media</span>
                <span style={{ color: '#f2784b' }}>✨</span>
            </Typography>

            <Container maxWidth="lg">

            <Grid container spacing={4} justifyContent="center">
                {audienceData.map((audience, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                overflow: 'hidden',
                                boxShadow: 3,
                                position: 'relative',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={audience.image}
                                alt={audience.title}
                                sx={{
                                    height: { xs: 200, md: 240 },
                                    filter: 'brightness(0.6)',
                                    borderRadius:"15px"
                                }}
                            />
                            <CardContent
                                sx={{
                                    position: 'absolute',
                                    bottom: 20,
                                    width: '90%',
                                    color: 'white',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    padding:"0px !important"
                                    
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {audience.title}
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

export default AudienceSection;
