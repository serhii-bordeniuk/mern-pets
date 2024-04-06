import { Box, useTheme, CircularProgress } from "@mui/material";
import ListPlaceholder from "components/ListPlaceholder";
import placeholderImage from "../../resources/images/playful-cat.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { useSelector } from "react-redux";
import EventsList from "./EventsList";
import FormButton from "components/ui/FormButton";

const HealthPage = () => {
    const [events, setEvents] = useState();
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { request, loading } = useHttp();
    const { palette } = useTheme();
    const primary = palette.primary.main;

    const getEvents = async () => {
        const fetchedEvents = await request(`${process.env.REACT_APP_BASE_URL}/events`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (fetchedEvents) {
            setEvents(fetchedEvents.events);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        const deletedEvent = await request(`${process.env.REACT_APP_BASE_URL}/events/${eventId}`, {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (deletedEvent) {
            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        }
    };

    useEffect(() => {
        getEvents();
        //eslint-disable-next-line
    }, []);

    return loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    ) :  (
        <Box m="auto" maxWidth="920px">
            {events && events.length === 0 && (
                <ListPlaceholder
                    title="There are no scheduled events"
                    imageSrc={placeholderImage}
                    onClick={() => {
                        navigate("/health/add-event");
                    }}
                />
            )}

            {events && events.length > 0 && (
                <>
                    <EventsList
                        events={events}
                        token={token}
                        handleDeleteEvent={handleDeleteEvent}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <FormButton
                            sx={{
                                bottom: "15px",
                                position: "fixed",
                                zIndex: "10",
                                width: "150px",
                                height: "56px",
                            }}
                            title="Add +"
                            color={primary}
                            onClick={() => navigate("/health/add-event")}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};
export default HealthPage;
