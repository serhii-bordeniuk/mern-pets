import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme,
} from "@mui/material";
import FormButton from "./ui/FormButton";

const Modal = ({ handleAction, dialogContentText, alertDialogText, onClose, isOpen }) => {
    
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const deleteColor = palette.delete.main;
    

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{alertDialogText}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <FormButton
                    onClick={onClose}
                    title="Go Back"
                    sx={{ width: "95px" }}
                    color={primary}
                />
                <FormButton
                    onClick={handleAction}
                    autoFocus
                    width="95px"
                    title="Delete"
                    sx={{ width: "95px" }}
                    color={deleteColor}
                />
            </DialogActions>
        </Dialog>
    );
};
export default Modal;
