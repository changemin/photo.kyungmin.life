import Marquee from "react-fast-marquee";
import styled from "styled-components";
import TextData from '../data/FlowingTextData.json';
import { Desktop, Mobile } from './mediaQuery'
import {ReactComponent as StarBurst} from '../starburst.svg';


// 총 N개의 사진들.
// 최근 업데이트

export default function FlowingText() {
  return( 
    <>
      <Desktop>
        <>
          <LeftMarquee />
          <RightMarquee />
        </>
      </Desktop>
      <Mobile>
        <>
          <TopMarquee />
          <BottomMarquee />
        </>
      </Mobile>
    </>
  )
  
}

const RightMarqueeContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 2vw;
  width: 100vh;
  transform: rotate(90deg);
`
const LeftMarqueeContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 2vw;
  width: 100vh;
  transform: rotate(-90deg);
`

const MobileMarqueeContainer = styled.div`
  position: fixed;
  top: 2vh;
  left:0;
  bottom: 0;
  width: 100vw;
  z-index: 2;
  height: 10vh;
  background-image: linear-gradient(rgba(19,19,19, 1),70%, rgba(19,19,19, 0) 100%);
`

const TopMarqueeContainer = styled.div`
  position: fixed;
  top: 0;
  left:0;
  bottom: 0;
  width: 100vw;
  z-index: 3;
  height: 10vh;
  background-image: linear-gradient(rgba(19,19,19, 1),70%, rgba(19,19,19, 0) 100%);
`

const BottomMarqueeContainer = styled.div`
  position: fixed;
  bottom: 2vh;
  left:0;
  bottom: 0;
  width: 100vw;
  z-index: 3;
  height: 6vh;
  background-image: linear-gradient(rgba(19,19,19, 0),50%, rgba(19,19,19, 1) 100%);
`

const MarqueeText = styled.div`
  display: flex;
  align-items: center;
  /* height: 100%; */
  font-family: "NanumSquareNeo-EB";
  font-size: clamp(0.5rem, 5vw, 5rem);

  @media screen and (max-width: 768px){
    display: flex;
    align-items: center;
    /* height: 100%; */
    font-family: "NanumSquareNeo-EB";
    font-size: clamp(0.5rem, 2rem, 5rem);
  }

`

const StyledStarBurst = styled(StarBurst)`
  width: 4vw;
  height: 4vw;
  margin: 0 2vh 0 2vh;
  fill: white;
`

const LeftMarquee = () => (
  <LeftMarqueeContainer>
    <Marquee gradient={false} speed={0.5} direction="left">
      {TextData.left.map((item) => (
        <>
          <MarqueeText>{item}</MarqueeText>
          <StyledStarBurst />
        </>
      ))}
    </Marquee>
  </LeftMarqueeContainer>
)

const RightMarquee = () => (
  <RightMarqueeContainer>
    <Marquee gradient={false} speed={0.5} direction="left">
      {TextData.right.map((item) => (
        <>
          <MarqueeText>{item}</MarqueeText>
          <StyledStarBurst />
        </>
      ))}
    </Marquee>
  </RightMarqueeContainer>
)

const TopMarquee = () => (
  <TopMarqueeContainer>
    <Marquee gradient={true} gradientColor={[19,19,19]} gradientWidth = {50} speed={10} direction="left">
      {TextData.left.map((item) => (
        <>
          <MarqueeText>{item}</MarqueeText>
          <StyledStarBurst />
        </>
      ))}
    </Marquee>
  </TopMarqueeContainer>
)


const BottomMarquee = () => (
  <BottomMarqueeContainer>
    <Marquee gradient={true} gradientColor={[19,19,19]} gradientWidth = {50} speed={10} direction="left">
      {TextData.right.map((item) => (
        <>
          <MarqueeText>{item}</MarqueeText>
          <StyledStarBurst />
        </>
      ))}
    </Marquee>
  </BottomMarqueeContainer>
)