import { Box } from "@mui/material";
import AuthForm from "components/AuthForm";
import MainBanner from "components/MainBanner";
import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import mainLogo from "../../resources/images/logo.svg";

const AuthPageContainer = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
`;

const FormWrapper = styled(Box)(({isNonMobile}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 0px',
    height: '100%',
    justifyContent: isNonMobile ? 'center' : 'normal'
}));

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
