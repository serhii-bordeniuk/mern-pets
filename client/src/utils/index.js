const { default: AccountPage } = require("pages/accountPage");
const { default: ExpensesPage } = require("pages/expensesPage");
const { default: HealthPage } = require("pages/healthPage");
const { default: PetsPage } = require("pages/petsPage");

const protectedRoutes = [
    { path: "/account", element: <AccountPage /> },
    { path: "/pets", element: <PetsPage /> },
    { path: "/expenses", element: <ExpensesPage /> },
    { path: "/health", element: <HealthPage /> },
];

export default protectedRoutes;
