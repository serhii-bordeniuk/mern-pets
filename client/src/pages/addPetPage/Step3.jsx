import { useFormContext } from "react-hook-form";
import { inputStyles } from "styles/styles";
import { StepWrapper } from "./AddPetForm";
import FilePicker from "components/FilePicker";
import { FormControl, TextField } from "@mui/material";

const Step3 = () => {
    const { register, formState } = useFormContext();
    const errors = formState.errors;

    return (
        <StepWrapper>
            <FilePicker />
            <h1>Breed of Your Pet?</h1>
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    key="breed-input"
                    {...register("breed")}
                    id="breed-input"
                    type="text"
                    label="Breed"
                    variant="outlined"
                    placeholder="Breed of your pet"
                    error={!!errors.breed}
                    helperText={errors.breed?.message}
                />
            </FormControl>
            <h1>Weight?</h1>
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    key="weight-input"
                    {...register("weight")}
                    id="weight-input"
                    type="text"
                    label="Weight"
                    variant="outlined"
                    placeholder="Weight of your pet in kg"
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                />
            </FormControl>
        </StepWrapper>
    );
};

export default Step3;
