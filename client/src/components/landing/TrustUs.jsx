import { Box, Typography } from "@mui/material";
import { LayoutContainer } from "styles/styles";
import FormButton from "components/ui/FormButton";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TrustUs = () => {
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const navigate = useNavigate();
    return (
        <Box mt="50px" textAlign="center" pb="100px">
            <LayoutContainer>
                <Typography variant="h3" fontWeight="700" fontSize="45px" mb="50px">
                    Trust us and feel free to try our service
                </Typography>
                <FormButton
                    sx={{ width: "120px" }}
                    color={primary}
                    title="Try for free"
                    onClick={() => navigate("/auth")}
                />
            </LayoutContainer>
        </Box>
    );
};
export default TrustUs;
