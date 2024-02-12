import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Typography } from "@mui/material";
import { inputStyles } from "styles/styles";
import styled from "@emotion/styled";
import fileIcon from "../../resources/images/icons/file.svg";
import { TextField, FormControl } from "@mui/material";
import FormButton from "components/ui/FormButton";
import { useDispatch } from "react-redux";

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

const AccountForm = () => {
    const dispatch = useDispatch();

    const schema = yup.object({
        fullName: yup.string("must be at least 3 characters").min(3),
        email: yup.string().email().min(4),

        phoneNumber: yup
            .string()
            .nullable()
            .matches(/^\+?\d{11,12}$/),
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
            fullName: "",
            email: "",
            oldPassword: "",
            password: "",
            confirmedPassword: "",
            phoneNumber: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
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
                                    {...register("fullName")}
                                    id="name-input"
                                    type="text"
                                    label="Full Name"
                                    variant="outlined"
                                    placeholder="User Name"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
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
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                    <FormButton
                        sx={{ marginTop: "20px" }}
                        title="Save"
                        color="#403128"
                        type="submit"
                    />
                </Box>
            </Box>
        </form>
    );
};
export default AccountForm;
