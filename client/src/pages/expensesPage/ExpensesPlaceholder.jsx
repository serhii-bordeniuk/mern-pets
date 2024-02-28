import { Box, Typography, useTheme } from "@mui/material";
import FormButton from "components/ui/FormButton";

const ExpensesPlaceholder = ({ handleOpen }) => {
    const { palette } = useTheme();
    const primary = palette.primary.main;
    return (
        <Box
            border={`1px solid ${primary}`}
            borderRadius="10px"
            height="265px"
            padding="40px 100px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography fontWeight="600" variant="h2">
                Add Your First Expense
            </Typography>
            <FormButton
                title="ADD +"
                onClick={handleOpen}
                color={primary}
                sx={{ width: "244px", height: "66px" }}
            />
        </Box>
    );
};
export default ExpensesPlaceholder;
