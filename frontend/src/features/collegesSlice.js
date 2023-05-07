import { createSlice } from "@reduxjs/toolkit";

export const collegesSlice = createSlice({
    name: "colleges",
    initialState: {
        colleges: {},
    },
    reducers: {
        addColleges: (state, action) => {
            state.colleges = action.payload
        },

    }
});

export const { addColleges } = collegesSlice.actions;

export const selectColleges = (state) => state.colleges.colleges;

export default collegesSlice.reducer;