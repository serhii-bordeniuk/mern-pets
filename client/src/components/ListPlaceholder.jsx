import { Box, useTheme } from "@mui/material";
import FormButton from "./ui/FormButton";

const ListPlaceholder = ({ title, imageSrc, onClick }) => {
    const { palette } = useTheme();
    const primary = palette.primary.main;

    return (
        <Box
            sx={{
                padding: "30px 25px",
                display: "flex",
                flexDirection: "column",
                maxWidth: "565px",
                alignItems: "center",
                margin: "0 auto",
            }}
        >
            <h1>Create a personal profile of your pet</h1>
            <Box>
                <img src={imageSrc} alt="placeholder" />
            </Box>
            <FormButton title="ADD +" onClick={onClick} color={primary} sx={{ width: "156px" }} />
        </Box>
    );
};
export default ListPlaceholder;
