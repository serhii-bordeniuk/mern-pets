import { Box } from "@mui/material";
import AccountForm from "./AccountForm";
import ChangePasswordForm from "./ChangePasswordForm";
import styled from "@emotion/styled";

const StyledAccountPage = styled(Box)`
    max-width: 914px;
    padding: 30px 25px;
    margin: auto;
`;

const AccountPage = () => {
    return (
        <StyledAccountPage>
            <AccountForm />
            <ChangePasswordForm />
        </StyledAccountPage>
    );
};
export default AccountPage;
