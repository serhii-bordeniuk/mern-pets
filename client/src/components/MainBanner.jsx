import logo from "../resources/images/logo.svg";
import banner from "../resources/images/banner.svg";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const ImageWrapper = styled.div`
    text-align: center;
`;

const MainBanner = () => {
    const isNonMobile = useMediaQuery("(min-width: 1300px)");
    return (
        isNonMobile && (
            <Box sx={{ backgroundColor: "#EBE6E1" }}>
                <ImageWrapper style={{ marginTop: "138px" }}>
                    <img src={logo} alt="logo" />
                </ImageWrapper>
                <ImageWrapper style={{ marginTop: "91px" }}>
                    <img src={banner} alt="banner" />
                </ImageWrapper>
            </Box>
        )
    );
};
export default MainBanner;
