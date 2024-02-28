import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useHttp } from "utils/useHttp";
import { getCategoryIcon } from "utils/utils";
const ExpensesList = ({ expenses, token, setExpenses }) => {
    const { request } = useHttp();
    const transformedExpenses = expenses.map((expense) => ({
        ...expense,
        id: expense._id,
        pet: expense.pet.name,
        date: dayjs(expense.date).format("MM/DD/YYYY"),
        price: `$ ${expense.price}`,
    }));

    const handleDeleteExpense = async (id) => {
        const deletedExpense = await request(`http://localhost:3001/expenses/${id}`, {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (deletedExpense) {
            const updatedExpenses = expenses.filter((expense) => expense._id !== id);
            setExpenses(updatedExpenses);
        }
    };

    const columns = [
        { field: "pet", headerName: "Pet Name", width: 90 },
        {
            field: "category",
            headerName: "Category",
            width: 80,
            renderCell: (params) => {
                return getCategoryIcon(params.row.category);
            },
        },
        {
            field: "description",
            headerName: "Description",
            width: 180,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            width: 100,
        },
        {
            field: "date",
            headerName: "Date",
            type: Date,
            width: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteExpense(params.row._id)}
                >
                    <DeleteOutlineIcon />
                </Button>
            ),
        },
    ];

    return (
        <Box>
            <DataGrid columns={columns} rows={transformedExpenses} />
        </Box>
    );
};
export default ExpensesList;
