import { Box, Typography, useMediaQuery } from "@mui/material";
import { LayoutContainer } from "styles/styles";
import dogs from "../../resources/images/dogs.jpg";

const Hero = () => {
    const isMobile = useMediaQuery("(max-width: 1000px)");
    return (
        <Box display="flex" flexDirection="column">
            <LayoutContainer>
                <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" mt="50px">
                    {/* Left side */}

                    <Box maxWidth="700px" display="flex" flexDirection="column">
                        <Typography variant="h1" fontSize={isMobile ? "40px" : "70px"} fontWeight="700">
                            Pet management and lists Tool
                        </Typography>
                        <Typography>
                            We believe that designing products and services in close partnership
                            with our clients is the only way to have a real impact on their
                            expirience.
                        </Typography>
                    </Box>
                    {/* Right side */}

                    <Box maxWidth="550px" maxHeight="450px" position="relative">
                        <img
                            src={dogs}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                            alt="walker dogs"
                        />
                    </Box>
                </Box>
            </LayoutContainer>
        </Box>
    );
};
export default Hero;
