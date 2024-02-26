import { Box, useTheme } from "@mui/material";
import catImage from "../resources/images/cat-imgae.png";
import { useNavigate } from "react-router-dom";

const PetItem = ({ name, petId, picturepath }) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const primary = palette.primary.main;

    return (
        <Box
            onClick={() => navigate(`/pets/${petId}`)}
            sx={{
                width: "400px",
                height: "300px",
                cursor: "pointer",
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden"
            }}
        >
            <img
                src={picturepath ? `http://localhost:3001/${picturepath}` : catImage}
                alt="your pet"
                height="100%"
                width="100%"
                style={{objectFit: "cover",}}
            />

            <Box
                sx={{
                    padding: "18px 20px",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    backgroundColor: primary,
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
