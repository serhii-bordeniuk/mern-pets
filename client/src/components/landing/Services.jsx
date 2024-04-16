import { Box, Typography, useMediaQuery } from "@mui/material";
import { LayoutContainer } from "styles/styles";
import CardService from "./CardService";
import service1 from "../../resources/images/service1.svg";
import service2 from "../../resources/images/service2.svg";
import service3 from "../../resources/images/service3.svg";

const Services = ({cardRefs}) => {
    const isMobile = useMediaQuery("(max-width: 1050px)");
    return (
        <Box mt={isMobile ? "50px" : "150px"}>
            <LayoutContainer>
                <Box textAlign="center">
                    <Typography className="servicesTitle" variant="h1" fontSize={isMobile ? "40px" : "70px"} fontWeight="700">
                        Featured Service that We Provide
                    </Typography>
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={isMobile ? "1fr" : "repeat(3, 320px)"}
                    justifyContent="center"
                    gridColumn="auto"
                    gap={isMobile ? "15px" : "30px"}
                    mt={isMobile ? "40px" : "80px"}
                    sx={isMobile ? { placeItems: "center" } : ""}
                    overFlowX="hidden"
                >
                    <CardService
                        cardRef={cardRefs.card1Ref}
                        imagePath={service1}
                        title="Keep your pets information in one place"
                        description="Store all important data in one convenient place. Whether it's vaccination information, diagnoses, or just important moments from their lives."
                        sx={{ backgroundColor: "#e9f0ff" }}
                    />
                    <CardService
                        cardRef={cardRefs.card2Ref}
                        imagePath={service2}
                        title="Schedule related events"
                        description="Create schedules for all important events. Whether it's visits to the vet, birthdays, or even walks in the park."
                        sx={{
                            position: "relative",
                            top: isMobile ? "0px" : "50px",
                            backgroundColor: "#525ffb",
                        }}
                    />
                    <CardService
                        cardRef={cardRefs.card3Ref}
                        imagePath={service3}
                        title="Keep health of your pets under control"
                        description="Track and categorize expenses related to your pets, from vet visits to grooming sessions, and gain insights into your spending habits."
                        sx={{ backgroundColor: "#ffe7aa" }}
                    />
                </Box>
            </LayoutContainer>
        </Box>
    );
};
export default Services;
