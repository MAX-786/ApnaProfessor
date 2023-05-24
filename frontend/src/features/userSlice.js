import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {}
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        addReviewId: (state, action) => {
            state.user.reviews_voted.push(action.payload);
        },
        removeReviewId: (state, action) => {
            state.user.reviews_voted = state.user.reviews_voted.filter((id) => (id !== action.payload));
        },
    },
});

export const { login, logout, addReviewId, removeReviewId } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;