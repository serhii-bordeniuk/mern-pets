import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "pages/authPage";
import NotFoundPage from "pages/notFound";
import AccountPage from "pages/accountPage";
import HealthPage from "pages/healthPage";
import ExpensesPage from "pages/expensesPage";
import PetsPage from "pages/petsPage";
import Layout from "components/Layout";
import Notification from "components/ui/Notification";

function App() {
    const isAuth = Boolean(useSelector((state) => state.auth.token));

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={isAuth ? <Navigate to="/account" /> : <AuthPage />} />
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
                </Routes>
            </BrowserRouter>
            <Notification />
        </div>
    );
}

export default App;
