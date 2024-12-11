import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loginUser: {},
    cartTotalQuantity: 0,
    cartTotalAmmount: 0
}



const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {

        setUserData: (state, action) => {
            state.loginUser = action.payload; 
        },

    


    }
})

export const { setUserData } = loginUserSlice.actions
export default loginUserSlice.reducer