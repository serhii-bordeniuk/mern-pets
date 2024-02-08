import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AuthPage from "pages/authPage";
import NotFoundPage from "pages/notFound";
import protectedRoutes from "utils";

function App() {

    const isAuth = false

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={isAuth ? <Navigate to="account" /> : <AuthPage />} />
                    {protectedRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={isAuth ? element : <Navigate to="/" replace={true} />}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
