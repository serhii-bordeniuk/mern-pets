import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, useTheme } from "@mui/material";
import { inputStyles } from "styles/styles";
import { TextField, FormControl } from "@mui/material";
import FormButton from "components/ui/FormButton";
import { setLogout } from "slices/authSlice";
import { accountSchema } from "utils/validators";
import ImagePicker from "components/ImagePicker";

const AccountForm = ({ request, isMobile }) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const [selectedImage, setSelectedImage] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: yupResolver(accountSchema),
        mode: "onSubmit",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await request("http://localhost:3001/user", {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (userData) {
                setValue("userName", userData?.userName || "");
                setValue("email", userData?.email || "");
                setValue("phoneNumber", userData?.phoneNumber || "");
                if (userData.picturepath) {
                    setSelectedImage(userData?.picturepath);
                }
            } else {
                dispatch(setLogout());
            }
        };

        fetchUserData(); //eslint-disable-next-line
    }, [token, request, setValue]);

    const onSubmit = (data) => {
        updateUser(data);
    };

    const updateUser = async (formData) => {
        const formDataToSend = new FormData();
        Object.keys(dirtyFields).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
        /////
        if (selectedImage) {
            formDataToSend.append("image", selectedImage);
        }

        //eslint-disable-next-line
        const updatedUser = await request("http://localhost:3001/user", {
            method: "put",
            data: formDataToSend,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box>
                <Typography variant="h4" fontWeight="600">
                    Basic details
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                    <Box
                        display="flex"
                        flexDirection={isMobile ? "column" : "row"}
                        gap="25px"
                        mt="20px"
                        alignItems={isMobile ? "center" : "flex-end"}
                    >
                        <ImagePicker onChange={setSelectedImage} selectedImage={selectedImage} />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                width: "100%",
                                justifyContent: "flex-end",
                            }}
                        >
                            <FormControl sx={{ ...inputStyles }} variant="outlined">
                                <TextField
                                    {...register("userName")}
                                    id="name-input"
                                    type="text"
                                    label="Full Name"
                                    variant="outlined"
                                    placeholder="User Name"
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>

                            <FormControl sx={{ ...inputStyles }} variant="outlined">
                                <TextField
                                    {...register("email")}
                                    id="email-input"
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter your email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>

                            <FormControl sx={{ ...inputStyles }} variant="outlined">
                                <TextField
                                    {...register("phoneNumber")}
                                    id="phone-input"
                                    type="text"
                                    label="Telephone"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="+380-00-000-00-00"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <FormButton
                        sx={{ marginTop: "20px", width: "95px" }}
                        title="Save"
                        width="95px"
                        color={primary}
                        type="submit"
                    />
                </Box>
            </Box>
        </form>
    );
};
export default AccountForm;
