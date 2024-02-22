import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputAdornment,
    TextField,
    useTheme,
} from "@mui/material";
import FilePicker from "components/FilePicker";
import { inputStyles } from "styles/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { petDedailsSchema } from "utils/validators";
import { formatDate, getYearsOld } from "utils/utils";
import FormButton from "components/ui/FormButton";
import Modal from "components/Modal";

const PetDefailsPage = () => {
    const { request } = useHttp();
    const { petId } = useParams();
    const token = useSelector((state) => state.auth.token);
    const [pet, setPet] = useState();
    const [isOpen, setOpen] = useState(false);
    const { palette } = useTheme();
    const deleteColor = palette.delete.main;
    const primary = palette.primary.main;
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const getPetById = async (petId) => {
        const fetchedPet = await request(`http://localhost:3001/pets/${petId}`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (fetchedPet) {
            setValue("name", fetchedPet?.pet.name || "");
            setValue("weight", fetchedPet?.pet.weight || "");
            setValue("birthDate", formatDate(fetchedPet?.pet.birthDate));
            setValue("description", fetchedPet?.pet.description);
            if (fetchedPet.pet.picturepath) {
                setSelectedImage(fetchedPet?.pet.picturepath);
            }
            setPet(fetchedPet.pet);
        }
    };

    const handleClickDialog = (type) => {
        if (type === "open") {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        getPetById(petId);
    }, []);

    const handleUpdatePet = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        const updatedPet = await request(`http://localhost:3001/pets/${petId}`, {
            method: "put",
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    const handleDeletePet = async () => {
        const deletedPet = await request(`http://localhost:3001/pets/${petId}`, {
            method: "delete",
            data: null,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (deletedPet) {
            navigate("/pets");
        }
    };

    const onSubmit = (formData) => {
        const { birthDate, ...formDataToSend } = formData;
        handleUpdatePet(formDataToSend);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: yupResolver(petDedailsSchema),
        mode: "onSubmit",
    });

    return (
        <Box mt="50px">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Box display="flex" flexDirection="row" gap="30px">
                        {/* Photo */}
                        <Box>
                            <FilePicker onChange={setSelectedImage} selectedImage={selectedImage} />
                        </Box>
                        {/* INPUTS */}
                        <Box display="flex" flexDirection="column" width="219px" gap="15px">
                            <FormControl sx={{ ...inputStyles }} variant="outlined">
                                <TextField
                                    {...register("name")}
                                    id="name-input"
                                    type="text"
                                    label="Name of your pet"
                                    variant="outlined"
                                    placeholder="Name"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                            <FormControl sx={{ ...inputStyles }} variant="outlined">
                                <TextField
                                    {...register("weight")}
                                    id="weight-input"
                                    type="text"
                                    label="Weight of your pet"
                                    variant="outlined"
                                    placeholder="Weight"
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">kg</InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                            <FormControl sx={{ ...inputStyles }} variant="outlined">
                                <TextField
                                    disabled={true}
                                    {...register("birthDate")}
                                    id="birthDate-input"
                                    type="text"
                                    label="Birth Date of your pet"
                                    variant="outlined"
                                    placeholder="mm/dd/yyyy"
                                    error={!!errors.birthDate}
                                    helperText={errors.birthDate?.message}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">{`${getYearsOld(
                                                pet?.birthDate
                                            )} y.o. |`}</InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <FormControl sx={{ width: "645px", height: "319px" }} variant="outlined">
                        <TextField
                            multiline
                            {...register("description")}
                            id="description-input"
                            type="text"
                            label="Description"
                            variant="outlined"
                            placeholder="Your pet's description"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            InputLabelProps={{ shrink: true }}
                            rows={10}
                        />
                    </FormControl>
                </Box>

                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <FormButton
                        onClick={() => navigate(-1)}
                        title="Back"
                        sx={{
                            color: primary,
                            border: `1px solid ${primary}`,
                            width: "150px",
                            height: "56px",
                        }}
                    />
                    <FormButton
                        title="Delete"
                        color={deleteColor}
                        sx={{
                            width: "150px",
                            height: "56px",
                        }}
                        onClick={() => handleClickDialog("open")}
                    />
                    <FormButton
                        title="Save"
                        type="submit"
                        color={primary}
                        sx={{
                            width: "150px",
                            height: "56px",
                        }}
                    />
                </Box>
            </form>
            <Modal
                isOpen={isOpen}
                onClose={handleClickDialog}
                handleAction={handleDeletePet}
                alertDialogText="Warning! Are your sure you want to delete your pet data?"
                dialogContentText="Your pet will be deleted"
            />
        </Box>
    );
};
export default PetDefailsPage;
