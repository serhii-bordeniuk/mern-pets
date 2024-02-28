import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { inputStyles, buttonStyles } from "styles/styles";

import { TextField, InputAdornment, IconButton, FormControl, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "slices/authSlice";
import { setNotification } from "slices/notificationSlice";
import { useHttp } from "utils/useHttp";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requestStatus } = useSelector((state) => state.notification);
    const { request } = useHttp();

    const schema = yup
        .object({
            email: yup.string().email().min(4),
            password: yup.string().min(8).max(32),
            confirmedPassword:
                !isLogin &&
                yup
                    .string()
                    .required("confirm password is a required field")
                    .nullable()
                    .test("match", "Passwords must match", function (value) {
                        if (value === null) {
                            return false;
                        }
                        return value === this.parent.password;
                    }),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const login = async (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        const loggedInUser = await request(`http://localhost:3001/auth/login`, {
            method: "post",
            data: formData,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (loggedInUser) {
            dispatch(
                setLogin({
                    userId: loggedInUser.userId,
                    token: loggedInUser.token,
                })
            );
            navigate("/account");
        }
    };
    const signup = async (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);;
        const signedUpUser = await request(`http://localhost:3001/auth/signup`, {
            method: "post",
            data: formData,
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (signedUpUser) {
            dispatch(
                setNotification({
                    requestStatus: "success",
                    title: "Successfully Signed Up! Now you can Log In.",
                })
            );
        }

        reset();
    };

    const onSubmit = async (data) => {
        if (!isLogin) {
            await signup(data);
        } else {
            await login(data);
        }
    };

    const handleClickShowPassword = (type) => {
        if (type === "confirmed") {
            setShowConfirmedPassword((prevState) => !prevState);
        } else {
            setShowPassword((prevState) => !prevState);
        }
    };

    const togglePageSwitcher = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (
        <Box sx={{ textAlign: "center", padding: "15px", maxWidth: "612px", width: "100%" }}>
            <Typography variant="h1" fontWeight="800">
                {isLogin ? "Log In" : "Sign Up"}
            </Typography>
            <form
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: "40px", marginTop: "40px" }}
                onSubmit={handleSubmit(onSubmit)}
            >
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

                {!isLogin && (
                    <>
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
                    </>
                )}
                <Button
                    disabled={requestStatus === "pending"}
                    sx={{ ...buttonStyles }}
                    size="large"
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    {isLogin ? "Log In" : "Register"}
                </Button>
            </form>

            <Typography sx={{ marginTop: "10px" }}>
                {isLogin ? (
                    <>
                        Don't have an account yet?
                        <span
                            style={{ cursor: "pointer", textDecoration: "underline", marginLeft: "5px" }}
                            onClick={togglePageSwitcher}
                        >
                            Register
                        </span>
                    </>
                ) : (
                    <>
                        Do you have an account already?
                        <span
                            style={{ cursor: "pointer", textDecoration: "underline" }}
                            onClick={togglePageSwitcher}
                        >
                            Log In
                        </span>
                    </>
                )}
            </Typography>
        </Box>
    );
};
export default AuthForm;
