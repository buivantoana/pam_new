import React from "react";
import {
    Box,
    Typography,
    Button,
    useMediaQuery,
    useTheme,
    Grid
} from "@mui/material";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import bannerLeftTop from '../../images/Group 1171275715.png'; // icon/video avatar
import bannerLeftBottom from '../../images/Group 1171275712.png';
import bannerRightTop from '../../images/Group 1171275716.png';
import bannerRightBottom from '../../images/Group 1171275714.png';

const Banner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box px={2} pt={isMobile ? 10 : "200px"} textAlign="center" height={isMobile ? "70vh" : "70vh"} sx={{ overflow: 'hidden', background: 'linear-gradient(to bottom, #fff5f0, white)' }} position="relative">
            {/* Avatar Images */}
            <Box
                component="img"
                src={bannerLeftTop}
                alt="Avatar 1"
                sx={{ position: 'absolute', top: isMobile ? 80 : 100, left: isMobile ? -20 : 150, width: isMobile ? 100 : "unset" }}
            />
            <Box
                component="img"
                src={bannerLeftBottom}
                alt="Avatar 2"
                sx={{ position: 'absolute', bottom: isMobile ? "40vh" : 150, left: isMobile ? -20 : 150, width: isMobile ? 120 : "unset" }}
            />
            <Box
                component="img"
                src={bannerRightTop}
                alt="Avatar 3"
                sx={{ position: 'absolute', top: isMobile ? 80 : 100, right: isMobile ? -20 : 150, width: isMobile ? 100 : "unset" }}
            />
            <Box
                component="img"
                src={bannerRightBottom}
                alt="Avatar 4"
                sx={{ position: 'absolute', bottom: isMobile ? "40vh" : 150, right: isMobile ? -30 : 150, width: isMobile ? 120 : "unset" }}
            />

            {/* Title Text */}
            <Typography variant="h1" fontWeight={700} sx={{ color: '#f26522', fontSize: isMobile ? "26px" : "65px",fontFamily:`"Courgette", cursive` }}>
                PAM MEDIA
            </Typography>
            <Typography variant="h3" sx={{ fontSize: isMobile ? "26px" : "65px",fontStyle:"italic" }} fontWeight={700} mt={1}>
                Passion Awakens <br /> Miracles
            </Typography>

            {/* Subtext */}
            <Typography maxWidth={600} my={4} mx="auto" fontSize={isMobile ? "12px" : "inherit"}>
                Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách PAM xây dựng một môi trường làm việc tử tế, tích cực và gắn kết.
            </Typography>

            {/* Contact Button */}
            <Box mt={4}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: '#f26522',
                        borderRadius: 999,
                        px:isMobile?2: 4,
                        py:isMobile?1: 1.5,
                        fontWeight: 600,
                        fontSize: isMobile?".8rem":'1rem',
                        boxShadow: '0 4px 14px rgba(242, 101, 34, 0.4)',
                        '&:hover': {
                            backgroundColor: '#e6541b'
                        }
                    }}
                    endIcon={<ArrowForwardIcon />}
                >
                    Liên Hệ Ngay
                </Button>
            </Box>

            {/* Stats Grid */}
            <Box sx={{ position: "relative", zIndex: 2, borderRadius: 2, display: "flex", justifyContent: "center", mt: isMobile?1:3 }}>
                <Grid container justifyContent="center"  sx={{ background: "white", borderRadius: 2, padding: 3, boxShadow: "0 0 8px #f26522" }} width={isMobile ? "100%" : "50%"} mt={6}>
                    {[
                        { number: '5+', label: 'Kinh nghiệm' },
                        { number: '150+', label: 'Thành viên' },
                        { number: '50M+', label: 'Người đăng kí' },
                        { number: '100+', label: 'Kênh truyền hình' },
                        { number: '5B+', label: 'Lượt xem mỗi năm' }
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
        </Box>
    );
};

export default Banner;