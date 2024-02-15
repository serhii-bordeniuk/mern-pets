import { Box } from "@mui/material";
import AccountForm from "./AccountForm";
import ChangePasswordForm from "./ChangePasswordForm";
import styled from "@emotion/styled";
import { useHttp } from "utils/useHttp";
import DeleteAccount from "./DeleteAccount";

const StyledAccountPage = styled(Box)`
    max-width: 914px;
    padding: 30px 25px;
    margin: auto;
`;

const AccountPage = () => {
    const { request } = useHttp();

    return (
        <StyledAccountPage>
            <AccountForm request={request} />
            <ChangePasswordForm request={request} />
            <DeleteAccount request={request} />
        </StyledAccountPage>
    );
};
export default AccountPage;
