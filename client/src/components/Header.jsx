import { Box, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { LayoutContainer } from "styles/styles";

const Header = ({ pageTitle }) => {
    return (
        <Box
            position="sticky"
            pt="57px"
            pb="15px"
            sx={{ top: "0", left: "0", right: "0", zIndex: "20", backgroundColor: "#FFFFFF" }}
        >
            <LayoutContainer>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="600" variant="h1">
                        {pageTitle}
                    </Typography>
                    <Box>
                        <NotificationsNoneIcon sx={{ cursor: "pointer" }} />
                    </Box>
                </Box>
            </LayoutContainer>
        </Box>
    );
};
export default Header;
