import { Button } from "@mui/material";

const FormButton = ({ sx, title, color, type, onClick }) => {
    return (
        <Button
            size="medium"
            onClick={onClick}
            type={type}
            sx={{
                ...sx,
                height: "40px",
                textTransform: "none",
                borderRadius: "10px",
                backgroundColor: color,
                color: "#fff",
                ":hover": { transform: "scale(1.02)", backgroundColor: color },
            }}
        >
            {title}
        </Button>
    );
};
export default FormButton;
