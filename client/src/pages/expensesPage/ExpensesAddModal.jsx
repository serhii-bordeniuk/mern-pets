import {
    Box,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, DialogContent, useTheme } from "@mui/material";
import foodIcon from "../../resources/images/icons/food-icon.svg";
import medicineIcon from "../../resources/images/icons/medicine-icon.svg";
import entertainmentIcon from "../../resources/images/icons/entertainment-icon.svg";
import othersIcon from "../../resources/images/icons/others-icon.svg";
import FormButton from "components/ui/FormButton";
import styled from "@emotion/styled";
import { inputStyles } from "styles/styles";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { StyledMenuItem } from "pages/addPetPage/AddPetForm";
import { expenseAddSchema } from "utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";

const CategoryStyled = styled(Box)`
    text-align: center;
    width: 150px;
    border: 2px solid ${(props) => (props.selected ? "#403128" : "transparent")};
    cursor: pointer;
    border-radius: 10px;
    padding: 5px;
`;

const ExpensesAddModal = ({ onClose, isOpen, token, getExpenses }) => {
    const { request } = useHttp();
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const [expenseCategory, setExpenseCategory] = useState(null);
    const [pets, setPets] = useState([]);

    const getPets = async () => {
        const fetchedPets = await request("http://localhost:3001/pets", {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (fetchedPets) {
            setPets(fetchedPets.pets);
        }
    };

    useEffect(() => {
        getPets();
    }, []);


    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(expenseAddSchema),
        mode: "onSubmit",
        defaultValues: {
            date: dayjs(),
            category: null,
        },
    });

    const handleCategorySelect = (category) => {
        setExpenseCategory(category);
        setValue("category", category);
    };

    const addExpense = async (data) => {
        const formData = new FormData();
        formData.append("category", data.category);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("pet", data.pet);
        formData.append("date", data.date.toISOString());

        const addedExpense = await request("http://localhost:3001/expenses/add-expense", {
            data: formData,
            method: "put",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (addedExpense) {
            getExpenses()
        }
    };

    const onSubmit = (data) => {
        addExpense(data);
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={() => {}}>
            <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ padding: "10px" }}>
                <DialogContent>
                    <Box display="flex" flexDirection="row">
                        <CategoryStyled
                            selected={expenseCategory === "food"}
                            onClick={() => handleCategorySelect("food")}
                        >
                            <img src={foodIcon} alt="food category" />
                            <Typography>Food</Typography>
                        </CategoryStyled>
                        <CategoryStyled
                            selected={expenseCategory === "medicine"}
                            onClick={() => handleCategorySelect("medicine")}
                        >
                            <img src={medicineIcon} alt="medicine category" />
                            <Typography>Medicine</Typography>
                        </CategoryStyled>
                        <CategoryStyled
                            selected={expenseCategory === "entertainment"}
                            onClick={() => handleCategorySelect("entertainment")}
                        >
                            <img src={entertainmentIcon} alt="entertainment category" />
                            <Typography>Entertainment</Typography>
                        </CategoryStyled>
                        <CategoryStyled
                            selected={expenseCategory === "others"}
                            onClick={() => handleCategorySelect("others")}
                        >
                            <img src={othersIcon} alt="others category" />
                            <Typography>Others</Typography>
                        </CategoryStyled>
                    </Box>
                    <FormHelperText sx={{ textAlign: "center" }} error id="pet-type-select">
                        {errors.category?.message}
                    </FormHelperText>
                    <Box mt="20px" display="flex" flexDirection="column" gap="20px">
                        <FormControl sx={{ ...inputStyles }} variant="outlined">
                            <TextField
                                key="price-input"
                                {...register("price")}
                                id="price-input"
                                type="text"
                                label="Price"
                                variant="outlined"
                                placeholder="10 USD"
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">$</InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>

                        <FormControl sx={{ ...inputStyles }} variant="outlined">
                            <TextField
                                key="description-input"
                                {...register("description")}
                                id="description-input"
                                type="text"
                                label="Description"
                                variant="outlined"
                                placeholder="Write about your expense"
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        </FormControl>

                        <FormControl sx={{ ...inputStyles }} variant="outlined">
                            <InputLabel id="pet-select">Pet</InputLabel>
                            <Controller
                                name="pet"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        id="pet-select"
                                        variant="outlined"
                                        label="Pet"
                                        {...field}
                                        error={!!errors.pet}
                                    >
                                        {pets.map((pet) => (
                                            <StyledMenuItem
                                                key={pet._id}
                                                value={pet._id.toString()}
                                            >
                                                <Box display="flex" gap="10px">
                                                    <img
                                                        alt="pet"
                                                        src={`http://localhost:3001/${pet.picturepath}`}
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                            borderRadius: "50%",
                                                        }}
                                                    />
                                                    <Typography>{pet.name}</Typography>
                                                </Box>
                                            </StyledMenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText error id="pet-type-select">
                                {errors.pet?.message}
                            </FormHelperText>
                        </FormControl>

                        <FormControl sx={{ ...inputStyles }} variant="outlined">
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => <DatePicker label="Date" {...field} />}
                            />
                            <FormHelperText
                                error={!!errors.date && !!errors.date.message}
                                children={errors.date?.message}
                            />
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <CloseIcon
                        onClick={onClose}
                        sx={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }}
                    />
                    <FormButton
                        type="submit"
                        title="ADD +"
                        sx={{ width: "150px", height: "56px" }}
                        color={primary}
                    />
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default ExpensesAddModal;
