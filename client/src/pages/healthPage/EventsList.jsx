import { Box } from "@mui/material";
import EventCard from "./EventCard";

const EventsList = ({ events, handleDeleteEvent }) => {
    return (
        <Box mt="10px" display="flex" flexWrap="wrap" gap="20px" justifyContent="center">
            {events.map((event) => {
                return (
                    <EventCard
                        key={event._id}
                        title={event.eventTitle}
                        petName={event.relatedPet.name}
                        picturepath={event.relatedPet.picturepath}
                        description={event.description}
                        reminder={event.reminder}
                        date={event.date}
                        eventId={event._id}
                        handleDeleteEvent={handleDeleteEvent}
                    />
                );
            })}
        </Box>
    );
};
export default EventsList;
