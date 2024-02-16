import { Box } from "@mui/material";
import notFoundImage from "../../resources/images/404.svg";
import FormButton from "components/ui/FormButton";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    return (
        <Box
            sx={{ maxWidth: "1317px", padding: "30px 25px", margin: "0 auto", textAlign: "center" }}
        >
            <Box>
                <h1>404: The page you are looking for isn't here</h1>
                <p>
                    You either tried some shady route or you came here by mistake. Whichever it is,
                    try using the navigation
                </p>
            </Box>
            <Box>
                <img src={notFoundImage} alt="Not found" />
            </Box>
            <FormButton
                title="Back"
                color="#403128"
                sx={{ width: "150px", height: "56px", fontSize: "26px" }}
                onClick={goBack}
            />
        </Box>
    );
};
export default NotFoundPage;
