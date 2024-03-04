import { Box, Typography, useMediaQuery } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { LayoutContainer } from "styles/styles";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ pageTitle, toggleNavbar, isMobile }) => {

    return (
        <Box
            position="sticky"
            pt={isMobile ? "30px" : "57px"}
            pb="15px"
            sx={{ top: "0", left: "0", right: "0", zIndex: "20", backgroundColor: "#FFFFFF" }}
        >
            <LayoutContainer>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {isMobile && (
                        <>
                            <MenuIcon sx={{ cursor: "pointer" }} onClick={toggleNavbar} />
                            <Box>
                                <NotificationsNoneIcon sx={{ cursor: "pointer" }} />
                            </Box>
                        </>
                    )}
                    {!isMobile && (
                        <>
                            <Typography fontWeight="600" variant="h1">
                                {pageTitle}
                            </Typography>
                            <Box>
                                <NotificationsNoneIcon sx={{ cursor: "pointer" }} />
                            </Box>
                        </>
                    )}
                </Box>
                {isMobile && (
                    <Typography fontWeight="600" variant="h3">
                        {pageTitle}
                    </Typography>
                )}
            </LayoutContainer>
        </Box>
    );
};
export default Header;
