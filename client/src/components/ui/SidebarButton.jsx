import { Button } from "@mui/material";

const SidebarButton = ({ title, icon, onClick }) => {
    return (
        <Button
            size="medium"
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "20px",
                lineHeight: "24px",
                fontWeight: "400px",
                color: "black",
                width: "100%",
                height: "69px",
                borderRadius: "20px",
                border: "none",
                textTransform: "none",
                ":hover": { backgroundColor: "#fff" },
                ".MuiSvgIcon-root": {
                    marginRight: "28px",
                    marginLeft: "10px",
                    width: "53px",
                    height: "53px",
                    color: "#403128"
                },
            }}
            onClick={onClick}
        >
            {icon}
            {title}
        </Button>
    );
};
export default SidebarButton;
