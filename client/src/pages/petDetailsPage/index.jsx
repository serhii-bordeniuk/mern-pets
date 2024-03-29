import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Box,
    FormControl,
    InputAdornment,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ImagePicker from "components/ImagePicker";
import { inputStyles } from "styles/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { petDedailsSchema } from "utils/validators";
import { formatDate, getYearsOld } from "utils/utils";
import FormButton from "components/ui/FormButton";
import Modal from "components/Modal";
import FilePicker from "components/FilePicker";

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
    const isMobile = useMediaQuery("(max-width:1100px)");
    const isMobileActions = useMediaQuery("(max-width:700px)");

    const [selectedImage, setSelectedImage] = useState(null);

    const [passportFile, setPassportFile] = useState(null);
    const [medCardFile, setMedCardFile] = useState(null);
    const [otherDocFile, setOtherDocFile] = useState(null);

    const fileStateMap = {
        Passport: [passportFile, setPassportFile],
        "Medical Card": [medCardFile, setMedCardFile],
        "Another Doc": [otherDocFile, setOtherDocFile],
    };

    const handleFileChange = (e, fileType, shouldDelete = false) => {
        //eslint-disable-next-line
        const [currentFile, setFile] = fileStateMap[fileType];
        if (shouldDelete) {
            setFile(null);
        } else {
            const file = e.target.files[0];
            setFile(file);
        }
    };

    const getPetById = async (petId) => {
        const fetchedPet = await request(`${process.env.REACT_APP_BASE_URL}/pets/${petId}`, {
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
            if (fetchedPet.pet.passportpath) {
                setPassportFile(fetchedPet?.pet.passportpath);
            }
            if (fetchedPet.pet.medcardpath) {
                setMedCardFile(fetchedPet?.pet.medcardpath);
            }
            if (fetchedPet.pet.anotherdocpath) {
                setOtherDocFile(fetchedPet?.pet.anotherdocpath);
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
        //eslint-disable-next-line
    }, []);

    const handleUpdatePet = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (selectedImage) {
            formData.append("image", selectedImage);
        }
        if (passportFile) {
            formData.append("passportFile", passportFile);
        }
        if (medCardFile) {
            formData.append("medCardFile", medCardFile);
        }
        if (otherDocFile) {
            formData.append("otherDocFile", otherDocFile);
        }
        //eslint-disable-next-line
        const updatedPet = await request(`${process.env.REACT_APP_BASE_URL}/pets/${petId}`, {
            method: "put",
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    const handleDeletePet = async () => {
        const deletedPet = await request(`${process.env.REACT_APP_BASE_URL}/pets/${petId}`, {
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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(petDedailsSchema),
        mode: "onSubmit",
    });

    return (
        <Box mt={isMobile ? "25px" : "50px"} pb="10px">
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                    gap="20px"
                >
                    <Box display="flex" flexDirection="row" gap={isMobile ? "10px" : "30px"}>
                        {/* Photo */}
                        <Box>
                            <ImagePicker
                                isMobile={isMobile}
                                onChange={setSelectedImage}
                                selectedImage={selectedImage}
                            />
                        </Box>
                        {/* INPUTS */}
                        <Box
                            display="flex"
                            flexDirection="column"
                            width={isMobile ? "100%" : "219px"}
                            gap="15px"
                        >
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

                    <FormControl
                        sx={{
                            maxWidth: `${isMobile ? null : "645px"}`,
                            width: `${isMobile ? null : "100%"} `,
                        }}
                        variant="outlined"
                    >
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
                            rows={isMobile ? 5 : 10}
                        />
                    </FormControl>
                </Box>

                <Box
                    display="flex"
                    alignItems={isMobile ? "center" : null}
                    justifyContent={isMobile ? "center" : null}
                    gap={isMobile ? "20px" : "30px"}
                    mt="50px"
                    flexDirection={isMobileActions ? "column" : "row"}
                >
                    <FilePicker
                        title="Passport"
                        handleFileChange={handleFileChange}
                        attachedFile={passportFile}
                    />
                    <FilePicker
                        title="Medical Card"
                        handleFileChange={handleFileChange}
                        attachedFile={medCardFile}
                    />
                    <FilePicker
                        title="Another Doc"
                        handleFileChange={handleFileChange}
                        attachedFile={otherDocFile}
                    />
                </Box>

                <Box
                    display="flex"
                    alignItems={isMobile ? "center" : null}
                    flexDirection={isMobileActions ? "column" : "row"}
                    gap="10px"
                    justifyContent="space-between"
                    mt={isMobile ? "30px" : "125px"}

                >
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
