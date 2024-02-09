import { Box } from "@mui/material";
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
    return (
        <StyledNavLinks>
            <StyledSidebarLink to="/account">
                <AccountCircleIcon />
                Account
            </StyledSidebarLink>

            <StyledSidebarLink to="/pets">
                <PetsIcon /> My Pets
            </StyledSidebarLink>

            <StyledSidebarLink to="/expenses">
                <PaidIcon /> Expenses
            </StyledSidebarLink>

            <StyledSidebarLink to="/health">
                <LocalHospitalIcon />
                Health
            </StyledSidebarLink>
        </StyledNavLinks>
    );
};
export default NavLinks;
