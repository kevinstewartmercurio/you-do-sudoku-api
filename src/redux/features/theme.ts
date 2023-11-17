import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface ThemeState {
    value: string
}

// Define the initial state using that type
const initialState: ThemeState = {
    value: "light"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const theme = (state: RootState) => state.theme.value

export const { updateTheme } = themeSlice.actions

export default themeSlice.reducer