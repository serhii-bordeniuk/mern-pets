import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { AlertTitle, Box, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { inputStyles, buttonStyles } from "styles/styles";
import Alert from "@mui/material/Alert";

import { TextField, InputAdornment, IconButton, FormControl, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "slices/authSlice";
import { setNotification } from "slices/notificationSlice";
import { useHttp } from "utils/useHttp";
import { LoadingButton } from "@mui/lab";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request, processing } = useHttp();

    const schema = yup
        .object({
            email: yup
                .string()
                .email("Email must be a valid email")
                .min(4, "Email must be at least 4 characters"),
            password: yup
                .string()
                .min(8, "Password must be at least 8 characters")
                .max(32, "Password can not be longer than 32 characters"),
            confirmedPassword:
                !isLogin &&
                yup
                    .string()
                    .required("Confirm password is a required field")
                    .nullable()
                    .test("match", "Passwords must match", function (value) {
                        if (value === null) {
                            return false;
                        }
                        return value === this.parent.password;
                    }),
        })
        .required();

    const formDefaultValues = () => {
        if (isLogin) {
            return {
                email: "test@test.com",
                password: "1234567890",
            };
        } else {
            return {
                email: "",
                password: "",
            };
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: formDefaultValues(),
        resolver: yupResolver(schema),
        mode: "all",
    });

    useEffect(() => {
        reset({ ...formDefaultValues() });
    }, [isLogin]);

    const login = async (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        const loggedInUser = await request(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
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
            navigate("/pets");
        }
    };
    const signup = async (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        const signedUpUser = await request(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
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
                    title: "Successfully Signed Up!",
                })
            );
        }

        reset();
    };

    const onSubmit = async (data) => {
        if (!isLogin) {
            await signup(data);
            await login(data);
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
                {processing === "loading" ? (
                    <LoadingButton
                        loading
                        loadingIndicator={<span style={{ color: "#fff" }}>Loading…</span>}
                        sx={{ ...buttonStyles }}
                    />
                ) : (
                    <Button
                        disabled={processing === "loading"}
                        sx={{ ...buttonStyles }}
                        size="large"
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        {isLogin ? "Log In" : "Register"}
                    </Button>
                )}
            </form>

            <Typography sx={{ marginTop: "10px" }}>
                {isLogin ? (
                    <>
                        Don't have an account yet?
                        <span
                            style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "5px",
                            }}
                            onClick={togglePageSwitcher}
                        >
                            Register
                        </span>
                    </>
                ) : (
                    <>
                        Do you have an account already?
                        <span
                            style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "5px",
                            }}
                            onClick={togglePageSwitcher}
                        >
                            Log In
                        </span>
                    </>
                )}
            </Typography>

            <Alert sx={{ textAlign: "start", marginTop: "20px" }} severity="info">
                <AlertTitle>Please Note!</AlertTitle>
                The server may take up to 30 seconds to spin up and run initially. Thank you for
                your patience!
            </Alert>
        </Box>
    );
};
export default AuthForm;
