import { Box, Typography } from "@mui/material";

const CardService = ({ title, description, sx, imagePath }) => {
    return (
        <Box
            sx={{...sx}}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            p="30px"
            borderRadius="11px"
            maxWidth="400px"
        >
            <img
                style={{ width: "200px", height: "200px", objectFit: "contain" }}
                src={imagePath}
                alt="service"
            />
            <Box display="flex" flexDirection="column" >
                <Typography variant="h3">{title}</Typography>
                <Typography mt="20px">{description}</Typography>
            </Box>
        </Box>
    );
};
export default CardService;
