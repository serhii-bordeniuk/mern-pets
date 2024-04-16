import { Box } from "@mui/material";
import mainLogo from "../../resources/images/logo.svg";
import FormButton from "components/ui/FormButton";
import { useTheme } from "@mui/material";
import { LayoutContainer } from "styles/styles";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const navigate = useNavigate();

    return (
        <Box pt="20px" right={0} left={0}>
            <LayoutContainer>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box maxWidth="150px">
                        <img width="100%" src={mainLogo} alt="" />
                    </Box>
                    <Box>
                        <FormButton sx={{ width: "120px" }} color={primary} title="Sign In" onClick={() => navigate("/auth")}/>
                    </Box>
                </Box>
            </LayoutContainer>
        </Box>
    );
};
export default Header;
