import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requestStatus: null,
    error: null,
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            console.log(action)
            state.requestStatus = action.payload.requestStatus;
            state.error = action.payload.error;
        },
    },
});

export const { setNotification } = notificationSlice.actions;
