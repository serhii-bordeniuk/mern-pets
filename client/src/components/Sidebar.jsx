import { Box, Divider, useTheme } from "@mui/material";
import NavLinks from "./NavLinks";
import { setLogout } from "slices/authSlice";
import { useDispatch } from "react-redux";
import mainLogo from "../resources/images/logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { StyledSidebarLink } from "styles/styles";

const Sidebar = () => {
    const { palette } = useTheme();
    const secondary = palette.secondary.main;
    const dispatch = useDispatch();
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="40px"
            position="fixed"
            top="0"
            bottom="0"
            left="0"
            sx={{ backgroundColor: secondary }}
        >
            <Box>
                <img src={mainLogo} width="100%" alt="" />
                <Divider sx={{ height: "2px", marginTop: "25px" }} />
                <NavLinks />
            </Box>
            <StyledSidebarLink onClick={() => dispatch(setLogout())}>
                <LogoutIcon />
                Log Out
            </StyledSidebarLink>
        </Box>
    );
};
export default Sidebar;
