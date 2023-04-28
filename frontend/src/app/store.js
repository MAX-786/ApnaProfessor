import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)



export const store = configureStore({
    reducer: {
        user: persistedReducer,
        // thread: threadReducer,
    },
    middleware: [thunk],
});

export const persistor = persistStore(store)