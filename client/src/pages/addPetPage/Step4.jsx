import { Controller, useFormContext } from "react-hook-form";
import { StepWrapper } from "./AddPetForm";
import FilePicker from "components/FilePicker";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { inputStyles } from "styles/styles";
import { DatePicker } from "@mui/x-date-pickers";

const Step4 = () => {
    const { register, formState, control } = useFormContext();
    const errors = formState.errors;

    console.log(errors.birthDate);

    return (
        <StepWrapper>
            <FilePicker />
            <h1>Date of Birth</h1>
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <Controller
                    control={control}
                    name="birthDate"
                    render={({ field }) => <DatePicker label="Birth Date" {...field} />}
                />
                <FormHelperText
                    error={!!errors.birthDate && !!errors.birthDate.message}
                    children={errors.birthDate?.message}
                />
            </FormControl>
            <h1>Description</h1>
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    key="description-input"
                    {...register("description")}
                    id="description-input"
                    type="text"
                    label="Description"
                    variant="outlined"
                    placeholder="Add information about your pet"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
            </FormControl>
        </StepWrapper>
    );
};
export default Step4;
