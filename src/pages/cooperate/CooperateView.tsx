import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import BannerBrandPartners from "./BannerBrandPartners";
import PartnersSection from "./PartnersSection";
import AudienceSection from "./AudienceSection";
import TopContentSection from "./TopContentSection";
import IPCardSection from "./IPCardSection";

type Props = {};

const CooperateView = ({ image }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box pt={isMobile ? 10 : "90px"} sx={{ background: "white" }}>
      <BannerBrandPartners image={image} />
      <PartnersSection />
      <AudienceSection image={image} />
      <TopContentSection image={image} />
      <IPCardSection />
    </Box>
  );
};

export default CooperateView;
