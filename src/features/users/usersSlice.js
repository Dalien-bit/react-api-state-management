import { createSlice } from '@reduxjs/toolkit';
// This file contains standard redux code for user reducer
const initialState = {
    value: [],
    status: 'idle',
}
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.value = (action.payload);
        }
    }

});
export const { addUsers } = usersSlice.actions;
export const selectUsers = (state) => state.users.value;
export default usersSlice.reducer;
