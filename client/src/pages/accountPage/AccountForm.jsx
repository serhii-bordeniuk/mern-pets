import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Typography, useTheme } from "@mui/material";
import { inputStyles } from "styles/styles";

import { TextField, FormControl } from "@mui/material";
import FormButton from "components/ui/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLogout } from "slices/authSlice";
import FilePicker from "components/FilePicker";

const AccountForm = ({ request }) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const primary = palette.primary.main;

    const schema = yup.object({
        userName: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Username must contain only letters")
            .min(3, "Username must be at least 3 characters"),
        email: yup.string().email().min(4),

        phoneNumber: yup
            .string()
            .nullable()
            .max(13, "Phone number must have 13 characters")
            .min(13, "Phone number must have 13 characters")
            .matches(/^\+?\d{11,12}$/, "Phone number must contain only numbers and '+'"),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: yupResolver(schema),
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
            } else {
                dispatch(setLogout());
            }
        };

        fetchUserData(); //eslint-disable-next-line
    }, [token, request, setValue]);

    const onSubmit = (formData) => {
        const formDataToSend = {};
        Object.keys(dirtyFields).forEach((key) => {
            formDataToSend[key] = formData[key];
        });
        updateUser(formDataToSend);
    };

    const updateUser = async (formData) => {
        //eslint-disable-next-line
        const updatedUser = await request("http://localhost:3001/user", {
            method: "put",
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ padding: "10px" }}>
                <Typography variant="h4" fontWeight="600">
                    Basic details
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "25px",
                            marginTop: "20px",
                            alignItems: "flex-end",
                        }}
                    >
                        <FilePicker />

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
