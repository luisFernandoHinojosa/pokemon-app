import { configureStore } from "@reduxjs/toolkit";
import trainerNameSlice from "./slices/trainerName.slice";
import pokemonsPerPageSlice from "./slices/pokemonsPerPage.slice";

export default configureStore({
  reducer: {
    trainerName: trainerNameSlice,
    pokemonsPerPage: pokemonsPerPageSlice,
  }
})