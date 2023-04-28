import { configureStore, createEntityAdapter } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage/session';
import { PURGE } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)
const customEntityAdapter = createEntityAdapter();

export const store = configureStore({
    reducer: {
        user: persistedReducer,
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