import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "../images/Frame 10.png"; // Replace with actual logo path

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{position:"fixed" ,zIndex:1000,width:"100%",py:2,background:"white"}}>

    <Container maxWidth='lg' sx={{ padding: "0px !important",}}>
      <Toolbar sx={{ justifyContent: "space-between",px: isMobile?"20px !important" :"0px !important" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <img src={Logo} alt="Pam Media" />

        </Box>

        {isMobile ? (
          <>
            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon />
            </IconButton>
            {mobileMenuOpen && (
              <Box
                position="absolute"
                top={64}
                left={0}
                width="100%"
                bgcolor="white"
                boxShadow={3}
                zIndex={1}
              >
                <MenuItem onClick={handleMenuClose}>Về chúng tôi</MenuItem>
                <MenuItem onClick={handleMenuClose}>Kênh</MenuItem>
                <MenuItem onClick={handleMenuClose}>Hợp tác</MenuItem>
                <MenuItem onClick={handleMenuClose}>Tuyển dụng</MenuItem>
                <MenuItem onClick={handleMenuClose}>Tin tức</MenuItem>
                <MenuItem>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#f26522",
                      color: "#f26522",
                      borderRadius: 5,
                      px: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Liên hệ
                  </Button>
                </MenuItem>
              </Box>
            )}
          </>
        ) : (
          <Box display="flex" alignItems="center" gap={5}>
            <Typography
              variant="body1"
              color="#f26522"
              fontWeight={700}
              sx={{ cursor: "pointer" }}
            >
              Về chúng tôi
            </Typography>
            <Box display="flex" fontWeight={500} alignItems="center" sx={{ cursor: "pointer" }}>
              <Typography variant="body1">Kênh</Typography>
              <ExpandMoreIcon fontSize="small" />
            </Box>
            <Typography  variant="body1" fontWeight={500} sx={{ cursor: "pointer" }}>
              Hợp tác
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ cursor: "pointer" }}>
              Tuyển dụng
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ cursor: "pointer" }}>
              Tin tức
            </Typography>

          </Box>
        )}
       {!isMobile&& <Button
          variant="outlined"
          sx={{
            borderColor: "#f26522",
            color: "#f26522",
            borderRadius: 5,
            px: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight:"bold"
          }}
          endIcon={<ArrowForwardIcon sx={{padding:"5px",borderRadius:"50%",background:"#f26522" ,color:"white"}} />}
        >
          Liên hệ
        </Button>}
      </Toolbar>
    </Container>
    </Box>

  );
};

export default Header;
