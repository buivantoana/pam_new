import React from "react";
import {
    Box,
    Typography,
    Button,
    useMediaQuery,
    useTheme,
    Grid,
    Container,
    Stack
} from "@mui/material";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import bannerRightBottom from '../../images/chanel.png';
import { RiTiktokFill } from 'react-icons/ri';
const Banner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box px={2} pt={isMobile ? 12 : "200px"} height={isMobile ? "auto" : "auto"} sx={{ overflow: 'hidden', background: 'linear-gradient(to bottom, #fff5f0, white)',pb:2 }} position="relative">
            {/* Avatar Images */}
            <Container maxWidth="lg">
                <Box display={"flex"} flexDirection={{xs:"column",md:"row"}} justifyContent={"space-between"}>
                    <Box>
                        <Typography variant="h1" fontWeight={700} sx={{ color: '#f26522', fontSize: isMobile ? "26px" : "65px", fontFamily: `"Courgette", cursive` }}>
                            Lyly and Pam
                        </Typography>
                        <Typography maxWidth={600} my={4} mx="auto" fontSize={isMobile ? "12px" : "inherit"}>
                            Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách PAM xây dựng một môi trường làm việc tử tế, tích cực và gắn kết.
                        </Typography>
                        <Typography variant="h5" fontWeight={"bold"}>Theo dõi và đăng ký</Typography>
                        <Stack direction="row" spacing={2} justifyContent="start" mt={3}>
                  <FacebookIcon sx={{ fontSize: 29, color: "#FF5722" }} />
                  <YouTubeIcon sx={{ fontSize: 29, color: "#FF5722" }} />
                  <RiTiktokFill style={{ fontSize: 28, color: "#FF5722" }} />
                  <InstagramIcon sx={{ fontSize: 29, color: "#FF5722" }} />
                </Stack>
                    </Box>
                    <Box
                        component="img"
                        src={bannerRightBottom}
                        alt="Avatar 4"
                        sx={{ width: isMobile ? "100%" : "500px" }}
                    />
                </Box>

                <Box sx={{ position: "relative", zIndex: 2, borderRadius: 2, display: "flex", justifyContent: "center", mt: isMobile ? 1 : 2 }}>
                    <Grid container justifyContent="center" sx={{ background: "white", borderRadius: 2, padding: 2, boxShadow: "0 0 8px #f26522" }} width={isMobile ? "100%" : "50%"} mt={6}>
                        {[

                            { number: '50M+', label: 'Người đăng kí' },
                            { number: '100+', label: 'Videos' },
                            { number: '5B+', label: 'Lượt xem' }
                        ].map((item, index) => (
                            <Grid item xs={6} sm={4} md={2} key={index} sx={{ textAlign: "center", borderLeft: !isMobile && index !== 0 ? "2px solid #ddd" : "none", ml: !isMobile && index !== 0 ? 3 : 0 }}>
                                <Typography variant="h5" fontWeight={700} color="#f26522">
                                    {item.number}
                                </Typography>
                                <Typography variant="body2">{item.label}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Container>

        </Box>
    );
};

export default Banner;