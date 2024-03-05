import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import FormButton from "components/ui/FormButton";
import dayjs from "dayjs";
import { StyledMenuItem } from "pages/addPetPage/AddPetForm";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { inputStyles } from "styles/styles";
import { useHttp } from "utils/useHttp";
import { eventAddSchema } from "utils/validators";

const EventForm = ({ token, eventId, }) => {
    const { request } = useHttp();
    const [pets, setPets] = useState([]);
    const { palette } = useTheme();
    const navigate = useNavigate();

    

    const getEventById = async () => {
        const fetchedEvent = await request(`${process.env.REACT_APP_BASE_URL}/events/${eventId}`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (fetchedEvent) {
            setValue("eventTitle", fetchedEvent?.eventTitle || "");
            setValue("relatedPet", fetchedEvent?.relatedPet || "");
            setValue("date", dayjs(fetchedEvent?.date));
            setValue("description", fetchedEvent?.description || "");
            setValue("reminder", fetchedEvent?.reminder || "");
        }
    };

    const getPets = async () => {
        const fetchedPets = await request(`${process.env.REACT_APP_BASE_URL}/pets`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (fetchedPets) {
            setPets(fetchedPets.pets);
        }
    };

    useEffect(() => {
        getPets();
        if (eventId) {
            getEventById();
        }
        //eslint-disable-next-line
    }, []);

    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(eventAddSchema),
        mode: "onSubmit",
        defaultValues: {
            date: dayjs(),
        },
    });

    const postEvent = async (data) => {
        const formData = new FormData();
        formData.append("eventTitle", data.eventTitle);
        formData.append("relatedPet", data.relatedPet);
        formData.append("date", data.date.toISOString());
        formData.append("description", data.description);
        formData.append("reminder", data.reminder);
        let endpoint;
        if (eventId) {
            endpoint = eventId;
        } else {
            endpoint = "add-event";
        }
        const postedEvent = await request(`${process.env.REACT_APP_BASE_URL}/events/${endpoint}`, {
            method: "put",
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (postedEvent) {
            navigate("/health");
        }
    };

    const onSubmit = (data) => {
        postEvent(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: "30px 25px", display: "flex", flexDirection: "column", gap: "20px" }}
            noValidate
        >
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    {...register("eventTitle")}
                    id="event-title-input"
                    type="text"
                    label="Name of the Event"
                    variant="outlined"
                    placeholder="Vaccine"
                    error={!!errors.eventTitle}
                    helperText={errors.eventTitle?.message}
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <InputLabel id="pet-select">Pet</InputLabel>
                <Controller
                    InputLabelProps={{ shrink: true }}
                    name="relatedPet"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            id="realted-pet-select"
                            variant="outlined"
                            label="Pet"
                            {...field}
                            error={!!errors.relatedPet}
                        >
                            {pets.map((pet) => (
                                <StyledMenuItem key={pet._id} value={pet._id.toString()}>
                                    <Box display="flex" gap="10px">
                                        <img
                                            alt="pet"
                                            src={`${process.env.REACT_APP_BASE_URL}/${pet.picturepath}`}
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%",
                                            }}
                                        />
                                        <Typography>{pet.name}</Typography>
                                    </Box>
                                </StyledMenuItem>
                            ))}
                        </Select>
                    )}
                />
                <FormHelperText error id="pet-type-select">
                    {errors.relatedPet?.message}
                </FormHelperText>
            </FormControl>

            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <Controller
                    control={control}
                    name="date"
                    InputLabelProps={{ shrink: true }}
                    render={({ field }) => (
                        <DateTimePicker
                            disableHighlightToday={false}
                            ampm={false}
                            disablePast={true}
                            label="Date and Time"
                            {...field}
                        />
                    )}
                />
                <FormHelperText
                    error={!!errors.date && !!errors.date.message}
                    children={errors.date?.message}
                />
            </FormControl>

            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    key="description-input"
                    {...register("description")}
                    id="description-input"
                    type="text"
                    label="Description"
                    variant="outlined"
                    placeholder="Write your description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    key="reminder-input"
                    {...register("reminder")}
                    id="reminder-input"
                    type="text"
                    label="Reminder"
                    variant="outlined"
                    placeholder="Take Documents"
                    error={!!errors.reminder}
                    helperText={errors.reminder?.message}
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>

            <FormButton type="submit" title="Save" color={palette.primary.main} />
        </form>
    );
};
export default EventForm;
