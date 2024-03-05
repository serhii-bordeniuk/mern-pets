import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import ExpensesPlaceholder from "./ExpensesPlaceholder";
import Diagram from "./Diagram";
import ExpensesAddModal from "./ExpensesAddModal";
import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { useSelector } from "react-redux";
import ExpensesList from "./ExpensesList";
import FormButton from "components/ui/FormButton";

const ExpensesPage = () => {
    const { request, loading } = useHttp();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const isMobile = useMediaQuery("(max-width: 1530px)");

    const handleToggleModal = () => {
        setIsOpenModal((prevState) => !prevState);
    };

    const getExpenses = async () => {
        const fetchedExpenses = await request(`${process.env.REACT_APP_BASE_URL}/expenses`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (fetchedExpenses) {
            setExpenses(fetchedExpenses.expenses);
        }
    };

    useEffect(() => {
        getExpenses();
        //eslint-disable-next-line
    }, []);

    return loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    ) : (
        <Box pt={isMobile ? "20px" : "50px"} position="relative">
            {expenses && expenses.length > 0 && (
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    mb="20px"
                    position="fixed"
                >
                    <FormButton
                        title="ADD +"
                        color={primary}
                        sx={{ width: "88px", height: "36px" }}
                        onClick={handleToggleModal}
                        disabled={isOpenModal}
                    />
                </Box>
            )}
            <Box
                p="50px 0px"
                m="0 auto"
                display="flex"
                justifyContent="space-between"
                gap="10px"
                flexDirection={isMobile ? "column-reverse" : "row"}
                maxWidth={isMobile ? "645px" : null}
            >
                {expenses && expenses.length === 0 && (
                    <ExpensesPlaceholder handleOpen={handleToggleModal} />
                )}
                {expenses && expenses.length > 0 && (
                    <ExpensesList setExpenses={setExpenses} token={token} expenses={expenses} />
                )}

                <Diagram expenses={expenses} />
                <ExpensesAddModal
                    getExpenses={getExpenses}
                    isOpen={isOpenModal}
                    onClose={handleToggleModal}
                    token={token}
                />
            </Box>
        </Box>
    );
};
export default ExpensesPage;
