import { Box, Divider, useTheme } from "@mui/material";
import NavLinks from "./NavLinks";
import { setLogout } from "slices/authSlice";
import { useDispatch } from "react-redux";
import mainLogo from "../resources/images/logo.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import { StyledSidebarLink } from "styles/styles";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ isMobile, isSidebarOpen, toggleNavbar }) => {
    const { palette } = useTheme();
    const secondary = palette.secondary.main;
    const dispatch = useDispatch();
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="40px 20px"
            position="fixed"
            zIndex="100"
            top="0"
            bottom="0"
            left={isMobile ? (isSidebarOpen ? "0" : "-100%") : "0"}
            transition="0.7s ease-in-out"
            sx={{ backgroundColor: secondary }}
        >
            <Box>
                {isMobile ? (
                    <CloseIcon
                    onClick={toggleNavbar}
                        sx={{ position: "absolute", right: "20px", top: "10px", cursor: "pointer" }}
                    />
                ) : null}
                <img src={mainLogo} width="100%" alt="" />
                <Divider sx={{ height: "2px", marginTop: "25px" }} />
                <NavLinks toggleNavbar={toggleNavbar}/>
            </Box>
            <StyledSidebarLink onClick={() => dispatch(setLogout())}>
                <LogoutIcon />
                Log Out
            </StyledSidebarLink>
        </Box>
    );
};
export default Sidebar;
