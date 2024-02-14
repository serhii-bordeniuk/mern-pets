import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import FormButton from "components/ui/FormButton";
import { inputStyles } from "styles/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import Notification from "components/ui/Notification";

const ChangePasswordForm = ({ request }) => {
    const token = useSelector((state) => state.auth.token);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    const schema = yup.object({
        oldPassword: yup.string().min(8).max(32).required("password is a required field"),
        password: yup.string().min(8).max(32),
        confirmedPassword: yup
            .string()
            .required("confirm password is a required field")
            .nullable()
            .test("match", "Passwords must match", function (value) {
                if (value === null) {
                    return false;
                }
                return value === this.parent.password;
            }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmedPassword: "",
        },
    });

    const handleClickShowPassword = (type) => {
        if (type === "confirmed") {
            setShowConfirmedPassword((prevState) => !prevState);
        } else if (type === "old") {
            setShowOldPassword((prevState) => !prevState);
        } else {
            setShowPassword((prevState) => !prevState);
        }
    };

    const updateUserPassword = async (formData) => {
        const updatedPassword = await request("http://localhost:3001/user/password", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldPassword: formData.oldPassword,
                password: formData.password,
            }),
        });

        console.log(updatedPassword);
    };

    const onSubmit = (formData) => {
        updateUserPassword(formData);
        reset()
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ padding: "10px" }}>
                <Typography sx={{ fontSize: "20px" }}>Change password</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        marginTop: "20px",
                        alignItems: "center",
                    }}
                >
                    <FormControl sx={{ ...inputStyles }} variant="outlined">
                        <TextField
                            {...register("oldPassword")}
                            id="old-password-input"
                            type={showOldPassword ? "text" : "password"}
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword?.message}
                            label="Old Password"
                            placeholder="Enter your old password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword("old")}
                                            edge="end"
                                        >
                                            {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ ...inputStyles }} variant="outlined">
                        <TextField
                            {...register("password")}
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            label="Password"
                            placeholder="Enter your password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword("")}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ ...inputStyles }} variant="outlined">
                        <TextField
                            {...register("confirmedPassword")}
                            id="confirmed-password-input"
                            type={showConfirmedPassword ? "text" : "password"}
                            error={!!errors.confirmedPassword}
                            helperText={errors.confirmedPassword?.message}
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword("confirmed")}
                                            edge="end"
                                        >
                                            {showConfirmedPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>

                    <FormButton
                        sx={{ width: "180px" }}
                        title="Change Password"
                        color="#403128"
                        type="submit"
                    />
                </Box>
            </Box>
        </form>
    );
};
export default ChangePasswordForm;
