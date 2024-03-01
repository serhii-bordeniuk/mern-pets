import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "slices/authSlice";
import { setNotification } from "slices/notificationSlice";
import axios from "axios";

export const useHttp = () => {
    const [loading, setLoading] = useState(true);
    const [reqError, setReqError] = useState(null);
    const [process, setProcess] = useState("waiting");

    const dispatch = useDispatch();

    const request = useCallback(
        async (
            url,
            { method = "get", data = null, headers = { "Content-Type": "application/json" } }
        ) => {
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
                if (method !== "get") {
                    dispatch(
                        setNotification({ requestStatus: "success", title: responseData.message })
                    );
                }
                return responseData;
            } catch (error) {
                console.log(error);
                if (error.response?.status === 401) {
                    dispatch(setLogout());
                }
                setLoading(false);
                setProcess("error");
                const errorMessage = error.response?.data?.message || "Something went wrong";
                setReqError(errorMessage);
                dispatch(
                    setNotification({
                        requestStatus: "error",
                        error: errorMessage,
                    })
                );
            }
        }, // eslint-disable-next-line
        []
    );

    const clearError = useCallback(() => {
        setReqError(null);
    }, []);

    return { loading, reqError, process, request, clearError };
};
