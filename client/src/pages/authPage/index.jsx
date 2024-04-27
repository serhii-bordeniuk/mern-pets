import { Box } from "@mui/material";
import AuthForm from "components/AuthForm";
import MainBanner from "components/MainBanner";
import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import mainLogo from "../../resources/images/logo.svg";
import { FormWrapper } from "styles/styles";

const AuthPageContainer = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
`;



const AuthPage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1300px)");
    return isNonMobile ? (
        <AuthPageContainer>
            <MainBanner />
            <FormWrapper isNonMobile>
                <AuthForm />
            </FormWrapper>
        </AuthPageContainer>
    ) : (
        <FormWrapper>
            <Box>
                <img src={mainLogo} alt="logo" />
            </Box>
            <AuthForm />
        </FormWrapper>
    );
};
export default AuthPage;
