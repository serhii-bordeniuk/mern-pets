import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate } from "react-router-dom";
import { LayoutContainer } from "styles/styles";
import { useState } from "react";

const Layout = ({ children, auth, pageTitle }) => {
    const isMobile = useMediaQuery("(max-width: 1000px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    return auth ? (
        <Box display="flex" height="100vh">
            {<Sidebar isSidebarOpen={isSidebarOpen} isMobile={isMobile} toggleNavbar={toggleNavbar}/>}
            <Box width="100%" marginLeft={isMobile ? "0px" : "312px"} position="relative">
                <Header pageTitle={pageTitle} toggleNavbar={toggleNavbar} isMobile={isMobile}/>
                <LayoutContainer>{children}</LayoutContainer>
            </Box>
        </Box>
    ) : (
        <Navigate to="/" />
    );
};
export default Layout;
