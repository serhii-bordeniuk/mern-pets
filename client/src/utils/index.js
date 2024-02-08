import AccountPage from "pages/accountPage";
import ExpensesPage from "pages/expensesPage";
import HealthPage from "pages/healthPage";
import PetsPage from "pages/petsPage";


const protectedRoutes = [
    { path: "/account", element: <AccountPage /> },
    { path: "/pets", element: <PetsPage /> },
    { path: "/expenses", element: <ExpensesPage /> },
    { path: "/health", element: <HealthPage /> },
];

export default protectedRoutes;
