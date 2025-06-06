import React from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';

const BannerBrandPartners = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '100%', md: '450px' },
        backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')`, // bạn có thể thay ảnh nền
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        px: isMobile?0:2,
        py:isMobile?3:0
      }}
    >
      {/* Overlay làm mờ nền */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />

      {/* Nội dung */}
      <Container  sx={{ zIndex: 2 }}>
        <Typography variant={isMobile?"h6":"h4"} fontWeight="bold" mb={2}>
          Đối tác thương hiệu
        </Typography>
        <Typography variant={isMobile?"body2":"body1"} mb={1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
        </Typography>
        <Typography variant={isMobile?"body2":"body1"} mb={1}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
        </Typography>
       
      </Container>
    </Box>
  );
};

export default BannerBrandPartners;
