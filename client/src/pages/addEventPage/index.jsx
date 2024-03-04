import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EventForm from "./EventForm";
import { useParams } from "react-router-dom";

const AddEventPage = () => {
    const token = useSelector((state) => state.auth.token);

    const { eventId } = useParams();
    return (
        <Box m="0 auto" mt="80px" display="flex" flexDirection="column" maxWidth="511px">
            <Typography fontWeight="600px" textAlign="center" variant="h3">
                {!eventId ? "Adding" : "Editing"} Event
            </Typography>
            <EventForm token={token} eventId={eventId} />
        </Box>
    );
};
export default AddEventPage;
