import React from 'react'
import styled from 'styled-components'
import LandingPageTop from '../components/LandingPageTop'
import LandingPageMid from '../components/LandingPageMid'
import LandingPageBottom from '../components/LandingPageBottom'
import LandingPageFooter from '../components/LandingPageFooter'

const StyledLandingPage = styled.div`
  width: 100vw;
`

export default function LandingPage() {
  return (
    <StyledLandingPage>
      <LandingPageTop/>
      <LandingPageMid/>
      <LandingPageBottom/>
      <LandingPageFooter/>
    </StyledLandingPage>
  )
}
