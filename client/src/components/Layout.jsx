import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate } from "react-router-dom";
import { LayoutContainer } from "styles/styles";

const LayoutWrapper = styled(Box)`
    width: 100%;
    margin-left: 352px;
    position: relative;
`;

const Layout = ({ children, auth, pageTitle }) => {
    return auth ? (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <LayoutWrapper>
                <Header pageTitle={pageTitle} />
                <LayoutContainer>{children}</LayoutContainer>
            </LayoutWrapper>
        </Box>
    ) : (
        <Navigate to="/" />
    );
};
export default Layout;
