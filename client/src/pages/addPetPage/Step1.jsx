import FilePicker from "components/FilePicker";
import { StepWrapper } from "./AddPetForm";
import { FormControl, TextField } from "@mui/material";
import { inputStyles } from "styles/styles";
import { useFormContext } from "react-hook-form";

const Step1 = ({setSelectedImage, selectedImage}) => {
    const { register, formState } = useFormContext();
    const errors = formState.errors;

    return (
        <StepWrapper>
            <h1>Photo</h1>
            <FilePicker onChange={setSelectedImage} selectedImage={selectedImage}/>
            <h1>What is your pet`s name?</h1>
            <FormControl sx={{ ...inputStyles }} variant="outlined">
                <TextField
                    {...register("name")}
                    id="name-input"
                    type="text"
                    label="Name"
                    variant="outlined"
                    placeholder="Name of your pet"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            </FormControl>
        </StepWrapper>
    );
};

export default Step1;
