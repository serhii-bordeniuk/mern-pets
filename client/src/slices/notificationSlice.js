import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: null,
    requestStatus: null,
    error: null,
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.title = action.payload.title;
            state.requestStatus = action.payload.requestStatus;
            state.error = action.payload.error;
        },
    },
});

export const { setNotification } = notificationSlice.actions;
