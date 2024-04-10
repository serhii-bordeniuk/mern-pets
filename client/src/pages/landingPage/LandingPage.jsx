import { Box } from "@mui/material";
import Header from "components/landing/Header";
import Hero from "components/landing/Hero";
import Management from "components/landing/Management";
import Services from "components/landing/Services";
import TrustUs from "components/landing/TrustUs";

const LandingPage = () => {
    return (
        <Box>
            <Header />
            <Hero/>
            <Services/>
            <Management/>
            <TrustUs/>
        </Box>
    );
};
export default LandingPage;
