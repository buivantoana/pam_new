import React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import patner from "../../images/Frame 1618871475.png"


const PartnersSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                backgroundColor: '#fff8f6',
                py: 5,
                textAlign: 'center',
            }}
        >
            <Typography textAlign="center" variant={isMobile ? "h5" : "h3"} fontWeight={500} mb={4}>
                Đối tác kênh của{' '}
                <Box component="span" sx={{ fontFamily: `"Courgette", cursive` }} fontWeight={600} fontStyle="italic" color="#A2BF00">
                    Pam-Media
                </Box>
            </Typography>

            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 3, px: 2 }}
            >

                <Grid item xs={12} sm={12} md={12} >
                    <Box
                        component="img"
                        src={patner}

                        sx={{
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            mx: 'auto',
                        }}
                    />
                </Grid>

            </Grid>
        </Box>
    );
};

export default PartnersSection;
