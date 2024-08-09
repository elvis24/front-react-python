import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import personaReducer from '../features/persona/personaSlice'

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck:false
})

export default configureStore({
    reducer: {
        persona:personaReducer,
    },
    middleware: customizedMiddleware,
})