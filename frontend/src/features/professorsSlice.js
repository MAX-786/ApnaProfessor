import { createSlice } from "@reduxjs/toolkit";

export const professorsSlice = createSlice({
    name: "professors",
    initialState: {
        professors: [],
    },
    reducers: {
        addProfessors: (state, action) => {
            state.professors = action.payload
        },

    }
});

export const { addProfessors } = professorsSlice.actions;

export const getProfessors = (state) => state.professors.professors;

export default professorsSlice.reducer;