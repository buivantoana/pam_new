import React from "react";
import { Box, Typography, Button, useMediaQuery, useTheme, Grid } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AboutImage1 from '../../images/Group 1171275683.png';
import AboutImage2 from '../../images/image.png';
import AboutImage3 from '../../images/Group 1171275685.png';
import AboutImage4 from '../../images/Header.png';
const AboutSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box py={isMobile?2:8} bgcolor={"white"} >
            <Grid container spacing={isMobile ? 6 : 5} alignItems="center">
                <Grid item xs={12} md={6}>
                    {/* <Typography variant="h4" fontWeight={600} mb={2}>
                        Về Chúng tôi <span style={{ color: '#f26522', fontStyle: 'italic',fontFamily:`"Courgette", cursive` }}>Pam-Media</span>
                    </Typography> */}
                    <Box mb={2} width={isMobile?"60%":"100%"}>

                        <img src={AboutImage4} width={"100%"} />
                    </Box>
                    <Typography color="textSecondary" mb={3}>
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                    </Typography>
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
                        endIcon={<ArrowForwardIcon />}
                    >
                        Liên Hệ Ngay
                    </Button>
                </Grid>
                <Grid item xs={12} md={6} textAlign="center">
                    <Box
                        component="img"
                        src={AboutImage1}
                        alt="PAM Image"
                        sx={{ maxWidth: '100%', borderRadius: 3, boxShadow: 3 }}
                    />
                </Grid>

                <Grid item xs={12} md={6} textAlign="center" order={{ xs: 3, md: 2 }}>
                    <Box
                        component="img"
                        src={AboutImage2}
                        alt="Pam Party"
                        sx={{ maxWidth: '100%', borderRadius: 3, boxShadow: 3 }}
                    />
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 2, md: 3 }}>
                    <Box mb={2} width={isMobile?"60%":"100%"}>
                        <img src={AboutImage3} width={"100%"} /></Box>
                    {/* <Typography variant="h4" fontWeight={600} mb={2}>
                        Hướng tới tương lai <span style={{ color: '#f26522', fontStyle: 'italic',fontFamily:`"Courgette", cursive` }}>kỷ nguyên số</span>
                    </Typography> */}
                    <Typography color="textSecondary" mb={3}>
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                    </Typography>
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
                        endIcon={<ArrowForwardIcon />}
                    >
                        Liên Hệ Ngay
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutSection;
