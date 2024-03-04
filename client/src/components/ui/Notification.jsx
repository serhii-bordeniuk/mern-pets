import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "slices/notificationSlice";

const Notification = () => {
    const dispatch = useDispatch();
    const { title, requestStatus, error } = useSelector((state) => state.notification);

    let alert;

    if (requestStatus === "pending") {
        alert = (
            <Alert severity="warning" sx={{ width: "100%" }}>
                Processing...
            </Alert>
        );
    }
    if (requestStatus === "error") {
        alert = (
            <Alert severity="error" sx={{ width: "100%" }}>
                {error}
            </Alert>
        );
    }

    if (requestStatus === "success") {
        alert = (
            <Alert severity="success" sx={{ width: "100%" }}>
                {title}
            </Alert>
        );
    }

    return (
        <Snackbar
            open={requestStatus ? true : false}
            autoHideDuration={6000}
            onClose={() => {
                dispatch(setNotification({ requestStatus: null, error: null }));
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            {alert}
        </Snackbar>
    );
};

export default Notification;
