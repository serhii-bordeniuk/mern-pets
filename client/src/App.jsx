import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import AuthPage from "pages/authPage";
import NotFoundPage from "pages/notFound";
import AccountPage from "pages/accountPage";
import HealthPage from "pages/healthPage";
import ExpensesPage from "pages/expensesPage";
import PetsPage from "pages/petsPage";
import Layout from "components/Layout";
import Notification from "components/ui/Notification";
import AddPetPage from "pages/addPetPage";
import PetDefailsPage from "pages/petDetailsPage";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    const isAuth = Boolean(useSelector((state) => state.auth.token));
    const theme = createTheme(themeSettings);

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Routes>
                            <Route path="*" element={<NotFoundPage />} />
                            <Route
                                path="/"
                                element={isAuth ? <Navigate to="/account" /> : <AuthPage />}
                            />
                            <Route
                                path="/account"
                                element={
                                    <Layout pageTitle="Account Page" auth={isAuth}>
                                        <AccountPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/health"
                                element={
                                    <Layout pageTitle="Health Page" auth={isAuth}>
                                        <HealthPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/expenses"
                                element={
                                    <Layout pageTitle="Expenses Page" auth={isAuth}>
                                        <ExpensesPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/pets"
                                element={
                                    <Layout pageTitle="Pets Page" auth={isAuth}>
                                        <PetsPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/pets/add-pet"
                                element={
                                    <Layout pageTitle="Pets Page" auth={isAuth}>
                                        <AddPetPage />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/pets/:petId"
                                element={
                                    <Layout pageTitle="Pet Details" auth={isAuth}>
                                        <PetDefailsPage />
                                    </Layout>
                                }
                            />
                        </Routes>
                    </LocalizationProvider>
                </ThemeProvider>
            </BrowserRouter>
            <Notification />
        </div>
    );
}

export default App;
