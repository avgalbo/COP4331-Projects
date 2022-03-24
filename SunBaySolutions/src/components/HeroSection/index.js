import React, { useState } from "react";
import { Button } from "../ButtonElements";
import Picture from "../../images/hotel.jpg";
// import Video from "https://i.divi.sh/hosp/jumbotron.mp4";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  PictureBg,
} from "./HeroElements";

function HeroSection() {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer id="home">
      <HeroBg>
        {/*<PictureBg*/}
        {/*  playsInline*/}
        {/*  autoPlay*/}
        {/*  loop*/}
        {/*  muted*/}
        {/*  src={Picture}*/}
        {/*  type="hotel/jpg"*/}
        {/*/>*/}
         <VideoBg playsInline autoPlay loop muted src="https://i.divi.sh/i/hotel_jumbotron.mp4" type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Hotel Knightro</HeroH1>
        <HeroP>Every stay will give you a reason to smile.</HeroP>
        <HeroBtnWrapper>
          {/* <Button
            to="signup"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            primary="true"
            dark="true"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button> */}
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
