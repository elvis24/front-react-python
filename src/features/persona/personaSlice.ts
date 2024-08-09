import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersona, Persona } from "../../interfaces/Persona";
import { act } from "react";

export interface PersonaState{
    data: IPersona;
    list: IPersona[]
}

const initialState: PersonaState = {
    data: new Persona(),
    list: []
}

export const personaSlice = createSlice({
    name: 'persona',
    initialState,
    reducers:{
        setData: (state, action: PayloadAction<IPersona>) =>{
            state.data = action.payload
        },
        setPersona: (state, action: PayloadAction<IPersona[]>) =>{
            state.list = action.payload
        },
    }
})

export const { setData, setPersona } = personaSlice.actions

export default personaSlice.reducer