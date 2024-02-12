import { Button } from "@mui/material";

const FormButton = ({ sx, title, color, type }) => {
    return (
        <Button size="medium" type={type}
            sx={{
                ...sx,
                borderRadius: "10px",
                width: "110px",
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
