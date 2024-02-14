import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Typography } from "@mui/material";
import { inputStyles } from "styles/styles";
import styled from "@emotion/styled";
import fileIcon from "../../resources/images/icons/file.svg";
import { TextField, FormControl } from "@mui/material";
import FormButton from "components/ui/FormButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "components/ui/Notification";

const FilePicker = styled(Box)`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 188px;
    width: 188px;
    border-radius: 100%;
    border: 1px solid #403128;
    cursor: pointer;
`;

const AccountForm = ({ request }) => {
    const token = useSelector((state) => state.auth.token);

    const schema = yup.object({
        userName: yup.string("must be at least 3 characters").min(3),
        email: yup.string().email().min(4),

        phoneNumber: yup
            .string()
            .nullable()
            .matches(/^\+?\d{11,12}$/),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await request("http://localhost:3001/user", {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setValue("userName", userData?.userName || "");
            setValue("email", userData?.email || "");
            setValue("phoneNumber", userData?.phoneNumber || "");
        };

        fetchUserData();
    }, [token, request, setValue]);

    const onSubmit = (formData) => {
        updateUser(formData);
    };

    const updateUser = async (formData) => {
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
                <Typography sx={{ fontSize: "20px" }}>Basic details</Typography>
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
                        <FilePicker>
                            <img src={fileIcon} alt="userImage" />
                        </FilePicker>
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
                        color="#403128"
                        type="submit"
                    />
                </Box>
            </Box>
        </form>
    );
};
export default AccountForm;
