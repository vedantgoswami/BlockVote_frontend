import React from 'react'
import TypeWriterText from './TypeWriterText'
import styled from 'styled-components'
import CoverVideo from './CoverVideo'
import backgroundImg from './images/BgImg.png'

const Homepage = () => {
    const Section = styled.section`
        min-height: 100%;
        width: 100vw;
        position: relative;
        // background-color: #eaf7ff;
        `
    const Container = styled.div`
        width: 90%;
        min-height: 100%;
        margin: 0 auto;
        // color: #f2fafd;
        // background-color: #eaf7ff;

        display: flex;
        justify-content: center;
        align-items: center;
        
    `
    const Box1 = styled.div`
        width: 60%;
        height: 100%;
        display: flex;
        // background-color: #eaf7ff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `
    const Box2 = styled.div`
        width: 40%;
        height: 100%;
        display: flex;
        // background-color: #eaf7ff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `
  return (
 
    <Section >
        <Container>
            <Box1 ><TypeWriterText/></Box1>
            <Box2 style={{marginLeft: "400px"}}><CoverVideo/></Box2>
        </Container>
        <div style={{backgroundImage: `url(${backgroundImg})`,marginTop: "0px" ,height: "650px" ,backgroundRepeat: "repeat-x"}} src={backgroundImg}/>
    </Section>
    
  )
}

export default Homepage