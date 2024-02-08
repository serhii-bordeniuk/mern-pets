const { Navigate } = require("react-router-dom");

const AuthGuard = ({ children, auth }) => {
    return auth ? children : <Navigate to="/" />;
};

export default AuthGuard;
