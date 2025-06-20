import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import GoogleMapReact from "google-map-react";

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
  marginTop: '16px'
};

const center = {
  lat: 21.007,  // Approximate coordinates for Tây Hà Tower
  lng: 105.794  // Update these with exact coordinates
};

const LocationInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mapLoaded, setMapLoaded] = React.useState(false);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        maxWidth: 900,
        margin: 'auto', 
        padding: isMobile ? 2 : 3,
        borderRadius: 2
      }}
    >
      {/* Main Headquarters Section */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          TRỤ SỞ CHÍNH
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          Tầng 4 - Tòa nhà Tây Hà - 19 Tố Hữu - Phường Trung Văn Quận Nam
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          Từ Liêm - Hà Nội
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Điện thoại: 047.301.5656 — Số máy lẻ: 6802
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Embedded Google Map */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          Bản đồ
        </Typography>
        
       
          <LoadScript
            googleMapsApiKey={"AIzaSyDonv4RF9rwbuSAVXbkuRt-_nu0skxZoIg"}
            onLoad={() => setMapLoaded(true)}
          >
            {mapLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
              >
                <Marker position={center} />
              </GoogleMap>
            )}
          </LoadScript>
        

        <Button 
          variant="outlined" 
          sx={{ mt: 2 }}
          href={`https://www.google.com/maps?q=${center.lat},${center.lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Xem bản đồ lớn hơn
        </Button>
      </Box>

     
    </Paper>
  );
};

export default LocationInfo;