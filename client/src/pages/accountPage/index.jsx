import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AccountForm from "./AccountForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useHttp } from "utils/useHttp";
import DeleteAccount from "./DeleteAccount";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "slices/authSlice";
import {CircularProgress} from "@mui/material";

const AccountPage = () => {
    const isMobile = useMediaQuery("(max-width: 900px)");
    const { request, loading } = useHttp();
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await request(`${process.env.REACT_APP_BASE_URL}/user`, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data) {
                setUserData(data);
            } else {
                dispatch(setLogout());
            }
        };

        fetchUserData(); //eslint-disable-next-line
    }, [token, request, dispatch]);

    return loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    ) : (
        <Box maxWidth="914px" p={isMobile ? "0" : "30px 25px"} m="auto">
            <AccountForm request={request} isMobile={isMobile} userData={userData} token={token} />
            <ChangePasswordForm request={request} />
            <DeleteAccount request={request} isMobile={isMobile} />
        </Box>
    );
};
export default AccountPage;
