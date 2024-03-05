import { Box, Typography, useTheme } from "@mui/material";
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
    handleDeleteEvent
}) => {
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const secondary = palette.secondary.main;
    const navigate = useNavigate();

    return (
        <Box
            position="relative"
            p="30px 20px"
            border={`solid 1px ${primary}`}
            borderRadius="10px"
            bgcolor={secondary}
            width="450px"
        >
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h3">{title}</Typography>
                <Box>
                    <EditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate(`/health/${eventId}`);
                        }}
                    />
                    <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => handleDeleteEvent(eventId)}/>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
                <Box display="flex" alignItems="center" gap="10px">
                    <img
                        style={{
                            objectFit: "cover",
                            width: "82px",
                            height: "82px",
                            borderRadius: "50%",
                            border: `1px solid ${primary}`,
                        }}
                        src={`${process.env.REACT_APP_BASE_URL}/${picturepath}`}
                        alt={petName}
                    />
                    <Typography fontWeight="800">{petName}</Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap="15px">
                    <Box>
                        <Typography variant="h5" fontWeight="800">
                            Description:
                        </Typography>
                        <Typography>{description}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight="800">
                            Date and time:
                        </Typography>
                        <Typography>{dayjs(date).format("MMMM D, YYYY HH:mm ")}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight="800">
                            Reminder:
                        </Typography>
                        <Typography>{reminder}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default EventCard;
