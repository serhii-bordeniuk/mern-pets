import { Box, Typography, useMediaQuery } from "@mui/material";
import { LayoutContainer } from "styles/styles";
import dogs from "../../resources/images/dogs.jpg";

const Hero = () => {
    const isMobile = useMediaQuery("(max-width: 1000px)");
    return (
        <Box display="flex" flexDirection="column" mt={isMobile ? "80px" : "150px"}>
            <LayoutContainer>
                <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                >
                    {/* Left side */}

                    <Box maxWidth="700px" display="flex" flexDirection="column">
                        <Typography
                            className="heroTitle"
                            variant="h1"
                            fontSize={isMobile ? "40px" : "70px"}
                            fontWeight="700"
                        >
                            Pet management and lists Tool
                        </Typography>
                        <Typography className="heroText" mt="20px">
                        Your lovely companions are an integral part of your family, and we believe they deserve nothing but the best care and attention. That's why we've crafted a unique pet management application. We're firm believers that only through collaborative efforts can we truly make a significant impact on their lives and enhance their experience. Let's embark on an incredible journey together into a world of care and joy for your beloved pets.
                        </Typography>
                    </Box>
                    {/* Right side */}

                    <Box maxWidth="550px" maxHeight="450px" position="relative">
                        <img
                            className="heroImage"
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
