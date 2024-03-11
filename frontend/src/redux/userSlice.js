import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
    token: '',
}

const usersList = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        userAuth: function (state, actions) {
            state.user = actions.payload;
            state.isAuth = true;
        },
        userUpdate: function (state, actions) {
            state.user = actions.payload;

        },
        deleteUser: function (state, actions) {
            state.user = actions.payload;
            state.isAuth = false;

        }
    }
});

export const { userAuth, userUpdate, deleteUser } = usersList.actions;
export default usersList.reducer;
