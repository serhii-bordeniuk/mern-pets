import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { StepWrapper, StyledMenuItem } from "./AddPetForm";
import { inputStyles } from "styles/styles";
import FilePicker from "components/FilePicker";
import { useFormContext, Controller } from "react-hook-form";

const Step2 = () => {
    const { formState, control } = useFormContext();
    const errors = formState.errors;

    return (
        <StepWrapper sx={{ gap: "25px" }}>
            <FilePicker />
            <h1>The Type Of You Pet?</h1>
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <InputLabel id="pet-type-select">Type</InputLabel>
                <Controller
                    name="petType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            id="pet-type-select"
                            variant="outlined"
                            label="Type"
                            {...field}
                            error={!!errors.petType}
                        >
                            <StyledMenuItem value="Cat">Cat</StyledMenuItem>
                            <StyledMenuItem value="Dog">Dog</StyledMenuItem>
                        </Select>
                    )}
                />
                <FormHelperText error id="pet-type-select">
                    {errors.petType?.message}
                </FormHelperText>
            </FormControl>

            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <InputLabel id="sex-select">Sex</InputLabel>
                <Controller
                    name="sex"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            id="sex-select"
                            variant="outlined"
                            label="Sex"
                            {...field}
                            error={!!errors.sex}
                        >
                            <StyledMenuItem value="Male">Male</StyledMenuItem>
                            <StyledMenuItem value="Female">Female</StyledMenuItem>
                        </Select>
                    )}
                />
                <FormHelperText error id="sex-select">
                    {errors.sex?.message}
                </FormHelperText>
            </FormControl>
        </StepWrapper>
    );
};

export default Step2;
