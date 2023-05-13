import { configureStore, createEntityAdapter } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import collegesReducer from "../features/collegesSlice";
import professorsReducer from "../features/professorsSlice";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage/session';
import { PURGE } from "redux-persist";

const persistConfigUser = {
    key: 'user',
    storage,
}
const persistConfigColleges = {
        key: 'colleges',
        storage,
    }
    // const persistConfigProfessors = {
    //     key: 'professors',
    //     storage,
    // }

const persistedReducer = persistReducer(persistConfigUser, userReducer)
const persistedReducerColleges = persistReducer(persistConfigColleges, collegesReducer)
    // const persistedReducerProfessors = persistReducer(persistConfigProfessors, professorsReducer)
const customEntityAdapter = createEntityAdapter();

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        colleges: persistedReducerColleges,
        professors: professorsReducer,
        // thread: threadReducer,
    },
    middleware: [thunk],
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            customEntityAdapter.removeAll(state);
        });
    }
});

export const persistor = persistStore(store)