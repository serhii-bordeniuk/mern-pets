import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "slices/authSlice";
import { setNotification } from "slices/notificationSlice";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState("waiting");

    const dispatch = useDispatch();

    const request = useCallback(
        async (
            url,
            { method = "GET", body = null, headers = { "Content-Type": "application/json" } }
        ) => {
            setLoading(true);
            setProcess("loading");
            try {
                const response = await fetch(url, { method, body, headers });
                if (!response.ok) {
                    const data = await response.json();
                    const error = new Error(data.message);
                    error.status = response.status;
                    throw error;
                }
                const data = await response.json();
                setLoading(false);
                setProcess("success");
                if (method === "PATCH") {
                    dispatch(setNotification({ requestStatus: "success" }));
                }
                return data;
            } catch (error) {
                if (error.status === 401) {
                    dispatch(setLogout());
                }
                setLoading(false);
                setProcess("error");
                setError(error.message || "Something went wrong");
                dispatch(setNotification({ requestStatus: "error", error: error.message }));
            }
        }, // eslint-disable-next-line
        []
    );

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loading, error, process, request, clearError };
};
