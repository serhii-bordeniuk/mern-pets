import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const StyledHeader = styled(Box)`
    position: static;
    top: 0;
    left: 0%;
    right: 0;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

const Header = ({ pageTitle }) => {
    return (
        <StyledHeader>
            <Typography sx={{ fontSize: "48px", fontWeight: "600" }}>{pageTitle}</Typography>
            <Box>
                <NotificationsNoneIcon sx={{cursor: "pointer"}} />
            </Box>
        </StyledHeader>
    );
};
export default Header;
