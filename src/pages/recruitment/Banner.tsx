import React from "react";
import {
    Box,
    Typography,
    Button,
    useMediaQuery,
    useTheme,
    Grid,
    Container
} from "@mui/material";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChannelSlider from "./ChannelSlider";


const Banner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box px={2} pt={isMobile ? 10 : "200px"} pb={2} textAlign="center" height={isMobile ? "auto" : "auto"} sx={{ overflow: 'hidden', background: 'linear-gradient(to bottom, #fff5f0, white)' }} position="relative">
            {/* Avatar Images */}


            {/* Title Text */}

            <Typography variant="h1" sx={{ fontSize: isMobile ? "26px" : "65px" }} fontWeight={700} mt={1}>
                Môi trường văn <br /> hóa tại  <span style={{ fontWeight: "700", color: '#f26522', fontSize: isMobile ? "26px" : "65px", fontFamily: `"Courgette", cursive` }}>
                    Pam-Media
                </span>
            </Typography>

            {/* Subtext */}
            <Typography maxWidth={600} my={2} mx="auto" fontSize={isMobile ? "12px" : "inherit"}>
                Văn hóa biết ơn không chỉ nằm ở lời nói, mà thể hiện qua cách PAM xây dựng một môi trường làm việc tử tế, tích cực và gắn kết.
            </Typography>

            <Container maxWidth="lg">
                <ChannelSlider />
            </Container>
            {/* Contact Button */}
            <Box mt={2}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: '#f26522',
                        borderRadius: 999,
                        px: isMobile ? 2 : 4,
                        py: isMobile ? 1 : 1.5,
                        fontWeight: 600,
                        fontSize: isMobile ? ".8rem" : '1rem',
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

        </Box>
    );
};

export default Banner;