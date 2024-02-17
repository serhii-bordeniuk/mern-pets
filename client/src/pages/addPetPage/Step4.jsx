import { useFormContext } from "react-hook-form";
import { StepWrapper } from "./AddPetForm";
import FilePicker from "components/FilePicker";
import { FormControl, TextField } from "@mui/material";
import { inputStyles } from "styles/styles";

const Step4 = () => {
    const { register, formState } = useFormContext();
    const errors = formState.errors;

    return (
        <StepWrapper>
            <FilePicker />
            <h1>Date of Birth</h1>
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    key="birth-date-input"
                    {...register("birthDate")}
                    id="birthDate-input"
                    type="text"
                    label="Birth Date"
                    variant="outlined"
                    placeholder="mm/dd/yyyy"
                    error={!!errors.birthDate}
                    helperText={errors.birthDate?.message}
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
