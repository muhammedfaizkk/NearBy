import { configureStore } from "@reduxjs/toolkit";
import usersList from "./userSlice";
import resDetails from "./restuarantsSlice";


const store = configureStore({
   reducer:{
    users : usersList,
    restuarants:resDetails
   }
})

export default store