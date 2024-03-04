import { Box, useMediaQuery } from "@mui/material";
import AccountForm from "./AccountForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useHttp } from "utils/useHttp";
import DeleteAccount from "./DeleteAccount";

const AccountPage = () => {
    const isMobile = useMediaQuery("(max-width: 900px)");
    const { request } = useHttp();

    return (
        <Box maxWidth="914px" p={isMobile ? "0" : "30px 25px"} m="auto">
            <AccountForm request={request} isMobile={isMobile}/>
            <ChangePasswordForm request={request} />
            <DeleteAccount request={request} isMobile={isMobile}/>
        </Box>
    );
};
export default AccountPage;
