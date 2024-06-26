import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import foodIcon from "../../resources/images/icons/food-icon.svg";
import medicineIcon from "../../resources/images/icons/medicine-icon.svg";
import entertainmentIcon from "../../resources/images/icons/entertainment-icon.svg";
import othersIcon from "../../resources/images/icons/others-icon.svg";
import { CategoryStyled, CategoryTitle } from "styles/styles";
import { useMemo } from "react";



const Diagram = ({ expenses }) => {
    const isMobile = useMediaQuery("(max-width: 500px)");
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
        <Box border={`1px solid ${primary}`} borderRadius="10px" p="15px 50px" display="flex" flexDirection="column" alignItems="center">
            <PieChart
                series={[
                    {
                        paddingAngle: 3,
                        innerRadius: isMobile ? 113 : 173, //113
                        outerRadius: isMobile? 150 : 210, //150
                        data,
                    },
                ]}
                margin={{ right: 5 }}
                width={isMobile ? 300 : 420}
                height={isMobile ? 300 : 420}
                slotProps={{
                    legend: {
                        hidden: true,
                    },
                }}
            />
            <Box
                display="flex"
                flexDirection="row"
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
