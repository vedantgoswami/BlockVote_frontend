import React from 'react'
import GIF from './images/Ballot.png'
import styled from 'styled-components'
const VideoContainer = styled.div`
  width: 100%;
  video{
    width: 100%;
    height: auto;
  }
`
const CoverVideo = () => {
  return (
    <VideoContainer>
        <img width="300px" src= {GIF} autoPlay muted loop/> 
    </VideoContainer>
  )
}

export default CoverVideo