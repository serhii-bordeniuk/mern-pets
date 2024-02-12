import { Box, Divider } from "@mui/material";
import NavLinks from "./NavLinks";
import styled from "@emotion/styled";
import { setLogout } from "slices/authSlice";
import { useDispatch } from "react-redux";
import mainLogo from "../resources/images/logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { StyledSidebarLink } from "styles/styles";

const StyledSidebar = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ebe6e1;
    padding: 40px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
`;

const Sidebar = () => {
    const dispatch = useDispatch();
    return (
        <StyledSidebar>
            <Box>
                <img src={mainLogo} width="100%" alt="" />
                <Divider sx={{ height: "2px", marginTop: "25px" }} />
                <NavLinks />
            </Box>
            <StyledSidebarLink onClick={() => dispatch(setLogout())}>
                <LogoutIcon />
                Log Out
            </StyledSidebarLink>
        </StyledSidebar>
    );
};
export default Sidebar;
