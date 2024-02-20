import { Box, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

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

const NavLinks = () => {
    const { palette } = useTheme();
    const primary = palette.primary.main;

    return (
        <StyledNavLinks>
            <StyledSidebarLink to="/account">
                <AccountCircleIcon sx={{ color: primary }} />
                Account
            </StyledSidebarLink>

            <StyledSidebarLink to="/pets">
                <PetsIcon sx={{ color: primary }} /> My Pets
            </StyledSidebarLink>

            <StyledSidebarLink to="/expenses">
                <PaidIcon sx={{ color: primary }} /> Expenses
            </StyledSidebarLink>

            <StyledSidebarLink to="/health">
                <LocalHospitalIcon sx={{ color: primary }} />
                Health
            </StyledSidebarLink>
        </StyledNavLinks>
    );
};
export default NavLinks;
