import { Box, Typography, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import foodIcon from "../../resources/images/icons/food-icon.svg";
import medicineIcon from "../../resources/images/icons/medicine-icon.svg";
import entertainmentIcon from "../../resources/images/icons/entertainment-icon.svg";
import othersIcon from "../../resources/images/icons/others-icon.svg";
import styled from "@emotion/styled";
import { useMemo } from "react";

const CategoryStyled = styled(Box)`
    width: 80px;
    text-align: center;
`;

const CategoryTitle = styled(Typography)`
    font-size: 16px;
`;

const Diagram = ({ expenses }) => {
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const medicine = palette.medicine.main;
    const food = palette.food.main;
    const entertainment = palette.entertainment.main;
    const others = palette.others.main;

    const calculateExpenses = (expenses) => {
        const categoryExpenses = {
            food: 0,
            medicine: 0,
            entertainment: 0,
            others: 0,
        };

        expenses?.forEach((expenses) => {
            const { category, price } = expenses;
            if (categoryExpenses.hasOwnProperty(category)) {
                categoryExpenses[category] += price;
            }
        });

        return categoryExpenses;
    };

    const calculatedExpenses = useMemo(() => calculateExpenses(expenses), [expenses]);

    const data = [
        { label: "Food", value: calculatedExpenses.food, color: food },
        { label: "Medicine", value: calculatedExpenses.medicine, color: medicine },
        { label: "Entertainment", value: calculatedExpenses.entertainment, color: entertainment },
        { label: "Others", value: calculatedExpenses.others, color: others },
    ];

    return (
        <Box border={`1px solid ${primary}`} borderRadius="10px" p="23px 98px">
            <PieChart
                series={[
                    {
                        paddingAngle: 3,
                        innerRadius: 173,
                        outerRadius: 210,
                        data,
                    },
                ]}
                margin={{ right: 5 }}
                width={420}
                height={420}
                slotProps={{
                    legend: {
                        hidden: true,
                    },
                }}
            />
            <Box
                display="flex"
                flexDirection="row"
                gap="30px"
                mt="20px"
                justifyContent="space-between"
            >
                <CategoryStyled>
                    <img src={foodIcon} alt="food category" />
                    <CategoryTitle>Food</CategoryTitle>
                    <Typography>{`$ ${calculatedExpenses.food}`}</Typography>
                </CategoryStyled>
                <CategoryStyled>
                    <img src={medicineIcon} alt="medicine category" />
                    <CategoryTitle>Medicine</CategoryTitle>
                    <Typography>{`$ ${calculatedExpenses.medicine}`}</Typography>
                </CategoryStyled>
                <CategoryStyled>
                    <img src={entertainmentIcon} alt="entertainment category" />
                    <CategoryTitle>Activities</CategoryTitle>
                    <Typography>{`$ ${calculatedExpenses.entertainment}`}</Typography>
                </CategoryStyled>
                <CategoryStyled>
                    <img src={othersIcon} alt="others category" />
                    <CategoryTitle>Other</CategoryTitle>
                    <Typography>{`$ ${calculatedExpenses.others}`}</Typography>
                </CategoryStyled>
            </Box>
        </Box>
    );
};
export default Diagram;
