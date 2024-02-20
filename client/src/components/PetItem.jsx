import { Box } from "@mui/material";
import catImage from "../resources/images/cat-imgae.png";
import { useNavigate } from "react-router-dom";

const PetItem = ({ name, petId }) => {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => navigate(`/pets/${petId}`)}
            sx={{
                width: "400px",
                height: "300px",
                cursor: "pointer",
                position: "relative",
                borderRadius: "10px",
            }}
        >
            <img src={catImage} alt="your pet" height="100%" width="100%" />

            <Box
                sx={{
                    padding: "18px 20px",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    backgroundColor: "#403128",
                    color: "#fff",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                }}
            >
                {name}
            </Box>
        </Box>
    );
};
export default PetItem;
