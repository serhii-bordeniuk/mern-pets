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
    text-align: center;
`;

const DeleteAccount = ({ request, isMobile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const deleteColor = palette.delete.main;
    const userId = useSelector((state) => state.auth.userId)
    const testAccId = "65ea2d866069ce47f172b1d9"

    const handleClickDialog = (type) => {
        if (type === "open") {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const onDeleteAccount = async () => {
        const deletedUser = await request(`${process.env.REACT_APP_BASE_URL}/user/delete`, {
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
        <Box p={isMobile ? "10px 0px" : "10px 29px"}>
            <Box
                display="flex"
                gap={isMobile? "5px" : "45px"}
                alignItems="center"
                flexDirection={isMobile ? "column" : "row"}
            >
                <Typography variant="h4" color={deleteColor}>
                    Delete Account
                </Typography>
                <StyledText>
                    Delete your account and all your source data. This is irreversible.
                </StyledText>
                <FormButton
                    disabled={userId === testAccId} // to prevent accidental deletion of a test account
                    title="Delete"
                    color={deleteColor}
                    sx={{ width: "95px"}}
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
