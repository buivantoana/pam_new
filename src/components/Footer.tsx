import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import {
  Instagram,
  Facebook,
  YouTube,
  LinkedIn,
} from '@mui/icons-material';
import Logo from "../images/Frame 10.png";
import { RiTiktokFill } from 'react-icons/ri';
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 2, }}>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Thông tin công ty */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                component="img"
                src={Logo} // Thay bằng logo thật nếu cần
                alt="Logo"
                sx={{ mr: 1 }}
              />

            </Box>

            <Typography variant="body2" color="textSecondary" mb={3}>
              Địa chỉ: Lorem Ipsum is simply dummy text of the printing and typesetting
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3}>
              Mail: LoremIpsum@gmail.com
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Điện thoại: 123456789
            </Typography>

            <Box>
              {[
                { icon: <Instagram />, color: '#E4405F' },
                { icon: <Facebook />, color: '#1877F2' },
                { icon: <RiTiktokFill />, color: '#000000' },
                { icon: <LinkedIn />, color: '#0077B5' },
                { icon: <YouTube />, color: '#FF0000' }
              ].map((item, idx) => (
                <IconButton
                  key={idx}
                  sx={{ color: item.color }}
                  size="large"
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Menu giữa */}
          <Grid item xs={6} md={4}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" underline="none" color="textPrimary">
                Về chúng tôi
              </Link>
              <Link href="#" underline="none" color="textPrimary">
                Kênh
              </Link>
              <Link href="#" underline="none" color="textPrimary">
                Hợp tác
              </Link>
            </Box>
          </Grid>

          {/* Menu phải */}
          <Grid item xs={6} md={4}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" underline="none" color="textPrimary">
                Tuyển dụng
              </Link>
              <Link href="#" underline="none" color="textPrimary">
                Tin tức
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Dòng cuối */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
          <Grid item>
            <Typography fontWeight={"bold"} variant="body2" style={{fontWeight:"bold"}}>
              © 2025 Pam Media. Bảo lưu mọi quyền
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" fontWeight={"bold"} gap={2}>
              <Link href="#" underline="none" variant="body2" style={{fontWeight:"bold",color:"black"}}>
                Điều khoản
              </Link>
              <Link href="#" underline="none" variant="body2" style={{fontWeight:"bold",color:"black"}}>
                Bảo mật
              </Link>
              <Link href="#" underline="none" variant="body2" style={{fontWeight:"bold",color:"black"}}>
                Cookie
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
