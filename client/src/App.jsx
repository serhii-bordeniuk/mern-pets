import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AuthPage from "pages/authPage";
import NotFoundPage from "pages/notFound";
import AccountPage from "pages/accountPage";
import HealthPage from "pages/healthPage";
import ExpensesPage from "pages/expensesPage";
import PetsPage from "pages/petsPage";

const AuthGuard = ({ children }) => {
    const isAuth = false;
    return isAuth ? children : <Navigate to="/" />;
};

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<AuthPage />} />
                    <Route
                        path="/account"
                        element={
                            <AuthGuard>
                                <AccountPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/health"
                        element={
                            <AuthGuard>
                                <HealthPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/expenses"
                        element={
                            <AuthGuard>
                                <ExpensesPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/pets"
                        element={
                            <AuthGuard>
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
