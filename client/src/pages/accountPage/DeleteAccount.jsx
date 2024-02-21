import { Box, Typography, useTheme } from "@mui/material";
import FormButton from "components/ui/FormButton";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "slices/authSlice";

const StyledText = styled.p`
    margin: 0;
    padding: 0;
`;


const DeleteAccount = ({ request }) => {
    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const deleteColor = palette.delete.main;
    const primary = palette.primary.main;

    const handleClickDialog = (type) => {
        if (type === "open") {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const onDeleteAccount = async () => {
        const deletedUser = await request("http://localhost:3001/user/delete", {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: null,
        });
        if (deletedUser) {
            dispatch(setLogout());
        }
    };

    return (
        <Box sx={{ padding: "10px 29px" }}>
            <Box sx={{ display: "flex", gap: "45px", alignItems: "center" }}>
                <Typography variant="h4" color={deleteColor}>
                    Delete Account
                </Typography>
                <StyledText>
                    Delete your account and all your source data. This is irreversible.
                </StyledText>
                <FormButton
                    title="Delete"
                    color={deleteColor}
                    sx={{ width: "95px" }}
                    onClick={() => handleClickDialog("open")}
                />
            </Box>
            <Dialog
                open={open}
                onClose={() => handleClickDialog("close")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Danger! Are you sure you want to delete your account permanently?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You will lose all your data.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <FormButton
                        onClick={() => handleClickDialog("close")}
                        title="Go Back"
                        sx={{ width: "95px" }}
                        color={primary}
                    />
                    <FormButton
                        onClick={onDeleteAccount}
                        autoFocus
                        width="95px"
                        title="Delete"
                        sx={{ width: "95px" }}
                        color={deleteColor}
                    />
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default DeleteAccount;
