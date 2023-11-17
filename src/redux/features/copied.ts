import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface CopiedState {
    value: boolean
}

// Define the initial state using that type
const initialState: CopiedState = {
    value: false
}

export const copiedSlice = createSlice({
    name: "copied",
    initialState,
    reducers: {
        updateCopied: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const copied = (state: RootState) => state.copied.value

export const { updateCopied } = copiedSlice.actions

export default copiedSlice.reducer