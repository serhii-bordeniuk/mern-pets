import logo from "../resources/images/logo.svg";
import banner from "../resources/images/banner.svg";
import styled from "@emotion/styled";
import { Box, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const ImageWrapper = styled.div`
    text-align: center;
`;

const MainBanner = () => {
    const { palette } = useTheme();
    const secondary = palette.secondary.main;

    const isNonMobile = useMediaQuery("(min-width: 1300px)");
    return (
        isNonMobile && (
            <Box sx={{ backgroundColor: secondary }}>
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
