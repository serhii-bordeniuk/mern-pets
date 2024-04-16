import { Box, Typography, useMediaQuery } from "@mui/material";
import { LayoutContainer } from "styles/styles";
import promo from "../../resources/images/promo.png";
import mobilepromo from "../../resources/images/mobilepromo.png";
import expensespromo from "../../resources/images/expensespromo.png";
import mobileexpensespromo from "../../resources/images/mobileexpensespromo.png";



const Management = () => {
    const isMobile = useMediaQuery("(max-width: 1000px)");
    return (
        <Box mt={isMobile ? "50px" : "150px"}>
            <LayoutContainer>
                {/* first */}
                <Box display="flex" gap="50px" alignItems="center" flexDirection={isMobile ? "column-reverse" : "row"} justifyContent="space-between">
                    {/* Left side */}
                    <Box maxWidth="500px">
                        <img
                            style={{ objectFit: "contain" }}
                            width="100%"
                            height="100%"
                            src={isMobile ? mobilepromo : promo}
                            alt="app page"
                        />
                    </Box>
                    {/* Right side */}
                    <Box>
                        <Typography className="managementTitle" variant="h3" fontSize="45px" fontWeight="700">
                            Why do you need pets management software?
                        </Typography>
                        <Typography mt="20px" sx={{ color: "#b1aaaa" }}>
                            Are you tired of juggling pet care tasks, rummaging through scattered
                            notes, and constantly feeling overwhelmed by your furry friend's needs?
                            Then it's time to streamline your pet management routine with our app.
                            Prioritize your pet's needs, manage your time effectively, and stay on
                            top of your pet care schedule effortlessly. With our solution, you'll
                            have everything you need to ensure your pet's well-being and happiness,
                            all in one place.
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" gap="50px" alignItems="center" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" mt={isMobile ? "50px" : "150px"}>
                    {/* Left side */}

                    <Box >
                        <Typography className="managementSecondTitle" variant="h3" fontSize="45px" fontWeight="700">
                            Efficient money control
                        </Typography>
                        <Typography mt="20px" sx={{ color: "#b1aaaa" }}>
                            Effortlessly manage your pet's finances with our app. Track expenses for
                            veterinary services, food, and other pet-related costs to efficiently
                            plan your budget and stay in control of your finances. We'll help you
                            keep track of your expenses and ensure your pets have everything they
                            need for care and comfort.
                        </Typography>
                    </Box>
                    {/* Right side */}
                    <Box maxWidth="500px" >
                        <img
                            style={{ objectFit: "contain" }}
                            width="100%"
                            height="100%"
                            src={isMobile ? mobileexpensespromo : expensespromo}
                            alt="app page"
                        />
                    </Box>
                </Box>
            </LayoutContainer>
        </Box>
    );
};
export default Management;
