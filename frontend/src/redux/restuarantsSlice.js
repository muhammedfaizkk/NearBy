import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    resData: [],
    myRes: []

}

const resDetails = createSlice({
    name: "restauantsDetails",
    initialState,
    reducers: {
        getResdetails: (state, actions) => {
            state.resData = actions.payload
        },
        getMyrestaurant: (state, actions) => {
            state.myRes = actions.payload
        }

    }

})

export const { getResdetails,getMyrestaurant } = resDetails.actions;
export default resDetails.reducer;
