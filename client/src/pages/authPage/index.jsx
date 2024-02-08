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

const FormWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const AuthPage = ({setIsAuth}) => {
    const isNonMobile = useMediaQuery("(min-width: 1300px)");
    return isNonMobile ? (
        <AuthPageContainer>
            <MainBanner />
            <FormWrapper>
                <AuthForm />
            </FormWrapper>
        </AuthPageContainer>
    ) : (
        <FormWrapper>
            <img src={mainLogo} alt="logo" />
            <AuthForm setIsAuth={setIsAuth}/>
        </FormWrapper>
    );
};
export default AuthPage;
