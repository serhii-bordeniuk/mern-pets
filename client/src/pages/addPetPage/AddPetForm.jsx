import { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import { Box, MenuItem, Step, Stepper } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";

import IconComponent from "components/ui/IconComponent";
import FormButton from "components/ui/FormButton";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { useHttp } from "utils/useHttp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Wrapper = styled(Box)`
    margin-top: 35px;
`;

export const StyledMenuItem = styled(MenuItem)`
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    background-color: #ebe6e1 !important;
    &:focus,
    &:hover {
        background-color: #beb2a6 !important;
    }
`;

export const StepWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormElement = styled(Box)`
    padding: 30px 25px;
`;

const ButtonsContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
`;

const AddPetForm = () => {
    const [activeStep, setActiveStep] = useState(1);
    const { request } = useHttp();
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const schemaArray = [
        yup.object({
            name: yup
                .string()
                .matches(/^[a-zA-Z]+$/, "Name must contain only letters")
                .min(3, "Name must be at least 3 characters"),
        }),
        yup.object({
            petType: yup.string().required("Select a valid option"),
            sex: yup.string().required("Select a valid option"),
        }),
        yup.object({
            breed: yup
                .string()
                .matches(/^[a-zA-Z\s]+$/, "Breed must contain only letters")
                .min(3, "Breed must be at least 3 characters"),
            weight: yup.string().matches(/^[0-9]+$/, "Weight must contain only numbers").test('max', 'Weight must be less than or equal to 100', value => parseInt(value) <= 100),
        }),
        yup.object({
            birthDate: yup.date().required("Birth Date is a required field"),
            description: yup.string().min(2, "Description must be at least 2 characters").max(100),
        }),
    ];
    const schema = schemaArray[activeStep - 1];

    const methods = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            birthDate: dayjs(),
        },
    });
    const { handleSubmit, trigger } = methods;
    const [selectedImage, setSelectedImage] = useState(null);

    const StepContent = useCallback(() => {
        switch (activeStep) {
            case 1:
                return <Step1 setSelectedImage={setSelectedImage} selectedImage={selectedImage} />;
            case 2:
                return <Step2 />;
            case 3:
                return <Step3 />;
            case 4:
                return <Step4 />;
            default:
                return null;
        }
        //eslint-disable-next-line
    }, [activeStep]);

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setActiveStep((prevState) => prevState + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 1) {
            setActiveStep((prevState) => prevState - 1);
        }
    };

    const addPet = async (formData) => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            //Check if formData has the property corresponding to the current key
            if (formData.hasOwnProperty(key)) {
                // Check if the key is 'birthDate' and the value is an instance of Date
                if (key === "birthDate" && formData[key] instanceof Date) {
                    // If it's 'birthDate', convert the Date object to ISO string before appending
                    formDataToSend.append(key, formData[key].toISOString());
                    // For other keys, simply append the value to formDataToSend
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        }
        if (selectedImage) {
            formDataToSend.append("image", selectedImage);
        }
        //eslint-disable-next-line
        const addedPet = await request(`${process.env.REACT_APP_BASE_URL}/pets/add-pet`, {
            method: "put",
            data: formDataToSend,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        navigate("/pets");
    };

    const onSubmit = (formData) => {
        addPet(formData);
    };

    return (
        <Wrapper>
            <FormProvider {...methods}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Stepper sx={{ justifyContent: "space-between" }} connector={null}>
                        {[1, 2, 3, 4].map((step, index) => (
                            <Step key={index}>
                                <IconComponent step={step} activeStep={activeStep} />
                            </Step>
                        ))}
                    </Stepper>

                    <FormElement>
                        <StepContent />
                        <ButtonsContainer>
                            <FormButton
                                disabled={activeStep === 1}
                                onClick={handleBack}
                                title="Back"
                                color="###"
                                sx={{
                                    border: "1px solid #403128",
                                    color: "black",
                                    width: "150px",
                                    height: "56px",
                                    fontSize: "18px",
                                }}
                            />

                            {activeStep === 4 ? (
                                <FormButton
                                    title="Submit"
                                    color="#403128"
                                    sx={{ width: "150px", height: "56px", fontSize: "18px" }}
                                    onClick={handleSubmit(onSubmit)}
                                />
                            ) : (
                                <FormButton
                                    onClick={handleNext}
                                    title="Next"
                                    color="#403128"
                                    sx={{ width: "150px", height: "56px", fontSize: "18px" }}
                                />
                            )}
                        </ButtonsContainer>
                    </FormElement>
                </form>
            </FormProvider>
        </Wrapper>
    );
};
export default AddPetForm;
