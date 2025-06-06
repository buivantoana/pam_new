import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Banner from './Banner'
import AboutSection from './AboutSection'
import IPCardSection from './IPCardSection'

type Props = {}

const ChanelView = (props: Props) => {
  return (
    <Box>
        <Banner/>
        <Container maxWidth="lg" sx={{bgcolor:"white"}}>
          <AboutSection/>
        </Container>
        <IPCardSection/>
    </Box>
  )
}

export default ChanelView