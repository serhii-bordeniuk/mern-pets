import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box } from "@mui/material";
import Header from "components/landing/Header";
import Hero from "components/landing/Hero";
import Management from "components/landing/Management";
import Services from "components/landing/Services";
import TrustUs from "components/landing/TrustUs";

const LandingPage = () => {
    gsap.registerPlugin(ScrollTrigger);
    const cardRefs = {
        card1Ref: useRef(null),
        card2Ref: useRef(null),
        card3Ref: useRef(null),
    };

    useLayoutEffect(() => {
        gsap.from(".heroTitle", {
            x: -500,
            duration: 1,
            ease: "power1.out",
        });
        gsap.from(".heroText", {
            x: 500,
            duration: 1,
            ease: "power1.out",
        });
        gsap.from(".heroImage", {
            opacity: 0,
            duration: 3,
        });
        gsap.from(".servicesTitle", {
            x: -500,
            ease: "power1.out",
            duration: 3,
            scrollTrigger: {
                trigger: ".servicesTitle",
                scrub: true,
                start: "top bottom",
                end: "center center",
            },
        });
        gsap.from(cardRefs.card1Ref.current, {
            x: -500,
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: cardRefs.card1Ref.current,
                scrub: true,
                start: "top bottom",
                end: "center center",
            },
        });
        gsap.from(cardRefs.card3Ref.current, {
            x: 500,
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
                trigger: cardRefs.card3Ref.current,
                scrub: true,
                start: "top bottom",
                end: "center center",
            },
        });
        gsap.from(".managementTitle", {
            scale: 0.5,
            scrollTrigger: {
                trigger: ".managementTitle",
                scrub: true,
                start: "top bottom",
                end: "center center",
            },
        })
        gsap.from(".managementSecondTitle", {
            scale: 0.5,
            scrollTrigger: {
                trigger: ".managementSecondTitle",
                scrub: true,
                start: "top bottom",
                end: "center center",
            },
        })
    }, []);

    return (
        <Box>
            <Header />
            <Hero />
            <Services cardRefs={cardRefs} />
            <Management />
            <TrustUs />
        </Box>
    );
};
export default LandingPage;
