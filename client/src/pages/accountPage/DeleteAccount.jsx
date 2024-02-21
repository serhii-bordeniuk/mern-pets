import { Box, Typography, useTheme } from "@mui/material";
import FormButton from "components/ui/FormButton";
import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "slices/authSlice";
import Modal from "components/Modal";

const StyledText = styled.p`
    margin: 0;
    padding: 0;
`;

const DeleteAccount = ({ request }) => {
    const [isOpen, setIsOpen] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const deleteColor = palette.delete.main;

    const handleClickDialog = (type) => {
        if (type === "open") {
            setIsOpen(true);
        } else {
            setIsOpen(false);
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
            <Modal
                isOpen={isOpen}
                onClose={handleClickDialog}
                handleAction={onDeleteAccount}
                alertDialogText="Warning! Are your sure you want to delete your account?"
                dialogContentText="Your account will be deleted! This is irreversible!"
            />
        </Box>
    );
};
export default DeleteAccount;
