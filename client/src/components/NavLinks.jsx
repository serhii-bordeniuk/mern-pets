import { Box, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from "react-router-dom";
import SidebarButton from "./ui/SidebarButton";

import PaidIcon from "@mui/icons-material/Paid";
import { StyledSidebarLink } from "styles/styles";

const StyledNavLinks = styled(Box)`
    margin-top: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 272px;
`;

const NavLinks = ({ toggleNavbar }) => {
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const navigate = useNavigate();

    return (
        <StyledNavLinks>
            <SidebarButton
                title="Account"
                onClick={() => {
                    toggleNavbar();
                    navigate("/account");
                }}
                icon={<AccountCircleIcon />}
            />

            <SidebarButton
                title="My Pets"
                onClick={() => {
                    toggleNavbar();
                    navigate("/pets");
                }}
                icon={<PetsIcon />}
            />

            <SidebarButton
                onClick={() => {
                    toggleNavbar();
                    navigate("/expenses");
                }}
                title="Expenses"
                icon={<PaidIcon />}
            />

            <SidebarButton
                onClick={() => {
                    toggleNavbar();
                    navigate("/health");
                }}
                title="Health"
                icon={<LocalHospitalIcon />}
            />
        </StyledNavLinks>
    );
};
export default NavLinks;
