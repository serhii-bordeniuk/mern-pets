import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate } from "react-router-dom";

const PageContainer = styled(Box)`
    width: 100%;
    margin: 57px 100px 125px 100px;
`;

const Layout = ({ children, auth, pageTitle }) => {
    return auth ? (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <PageContainer>
                <Header pageTitle={pageTitle}/>
                {children}
            </PageContainer>
        </Box>
    ) : (
        <Navigate to="/" />
    );
};
export default Layout;
