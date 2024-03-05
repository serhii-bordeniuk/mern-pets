import { useFormContext } from "react-hook-form";
import { inputStyles } from "styles/styles";
import { StepWrapper } from "./AddPetForm";
import { FormControl, InputAdornment, TextField } from "@mui/material";

const Step3 = () => {
    const { register, formState } = useFormContext();
    const errors = formState.errors;

    return (
        <StepWrapper>
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
                    placeholder="Weight of your pet"
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                      }}
                />
            </FormControl>
        </StepWrapper>
    );
};

export default Step3;
