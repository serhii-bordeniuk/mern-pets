import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "slices/authSlice";
import { setNotification } from "slices/notificationSlice";
import axios from "axios";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState("waiting");

    const dispatch = useDispatch();

    const request = useCallback(
        async (
            url,
            { method = "get", data = null, headers = { "Content-Type": "application/json" } }
        ) => {
            setLoading(true);
            setProcess("loading");
            try {
                const response = await axios({
                    url,
                    method,
                    data,
                    headers,
                });
                const responseData = response.data;
                setLoading(false);
                setProcess("success");
                if (method === "patch" || method === "post" || method === "put") {
                    dispatch(setNotification({ requestStatus: "success", title: responseData.message  }));
                }
                return responseData;
            } catch (error) {
                if (error.response?.status === 401) {
                    dispatch(setLogout());
                }
                console.log(error);
                setLoading(false);
                setProcess("error");
                setError(error.response.data?.message || "Something went wrong");
                dispatch(
                    setNotification({ requestStatus: "error", error: error.response.data.message })
                );
            }
        }, // eslint-disable-next-line
        []
    );

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loading, error, process, request, clearError };
};
