import { Avatar, Box, Card, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const EventCard = ({
    title,
    petName,
    picturepath,
    description,
    reminder,
    date,
    eventId,
    handleDeleteEvent,
}) => {
    const { palette } = useTheme();
    const secondary = palette.secondary.main;
    const navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: secondary }}>
            <CardHeader 
                avatar={
                    <Avatar
                        aria-label="your pet"
                        src={`${process.env.REACT_APP_BASE_URL}/${picturepath}`}
                    ></Avatar>
                }
                action={
                    <Box sx={{ml: "10px"}}>
                        <EditIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate(`/health/${eventId}`);
                            }}
                        />
                        <DeleteOutlineIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleDeleteEvent(eventId)}
                        />
                    </Box>
                }
                title={title}
                subheader={dayjs(date).format("MMMM D, YYYY HH:mm ")}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {reminder}
                </Typography>
            </CardContent>
        </Card>
    );
};
export default EventCard;
