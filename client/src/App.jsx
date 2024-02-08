import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AuthPage from "pages/authPage";
import NotFoundPage from "pages/notFound";
import AccountPage from "pages/accountPage";
import HealthPage from "pages/healthPage";
import ExpensesPage from "pages/expensesPage";
import PetsPage from "pages/petsPage";
import AuthGuard from "components/AuthGuard";
import { useEffect, useState } from "react";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true);
        }
    }, []);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route
                        path="/"
                        element={
                            isAuth ? <Navigate to="/account" /> : <AuthPage setIsAuth={setIsAuth} />
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            <AuthGuard auth={isAuth}>
                                <AccountPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/health"
                        element={
                            <AuthGuard auth={isAuth}>
                                <HealthPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/expenses"
                        element={
                            <AuthGuard auth={isAuth}>
                                <ExpensesPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/pets"
                        element={
                            <AuthGuard auth={isAuth}>
                                <PetsPage />
                            </AuthGuard>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
