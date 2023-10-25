import { createSlice } from "@reduxjs/toolkit";

const pokemonsPerPageSlice = createSlice({
  name:"pokemonsPerPage",
  initialState:16,
  reducers:{
    setPokemonsPerPage:(state, action)=>{
      const newPokemonsPerPage = action.payload
      return newPokemonsPerPage
    }
  }
})

export const {setPokemonsPerPage} = pokemonsPerPageSlice.actions 
export default pokemonsPerPageSlice.reducer