import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { checkToken } from "../utils";

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (token) => {
        const response = await Axios.post('http://localhost:3001/api/v1/user/profile', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.body

    }
)

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (user) => {
        const response = await Axios.post('http://localhost:3001/api/v1/user/login', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data.body
    }
)

export const userEdit = createAsyncThunk(
    'user/userEdit',
    async (userName) => {
        const token = localStorage.getItem('token')
        const response = await Axios.put('http://localhost:3001/api/v1/user/profile', userName, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        })
        return response.data.body
    }
)

export const getAccounts = createAsyncThunk(
    'user/getAccounts',
    async (token) => {
        const response = await Axios.post('http://localhost:3001/api/v1/account/accounts', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.body
    }
)

const initialState = {
    token: checkToken() ? localStorage.getItem('token') : null,
    isLogged: checkToken(),
    profile: {},
    accounts: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogout(state) {
            state.token = null
            state.isLogged = false
            state.profile = {}
            state.accounts = []
            localStorage.removeItem('token')
        }
        
    }, extraReducers(builder) {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLogged = true
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLogged = false
            state.token = null
            console.log(action.error.message)
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload
        })
        builder.addCase(getProfile.rejected, (state, action) => {
            state.profile = {}
            console.log(action.error.message)
        })
        builder.addCase(userEdit.fulfilled, (state, action) => {
            state.profile = action.payload
        })
        builder.addCase(userEdit.rejected, (state, action) => {
            console.log(action.error.message)
        })
        builder.addCase(getAccounts.fulfilled, (state, action) => {
            state.accounts = action.payload
        })
        builder.addCase(getAccounts.rejected, (state, action) => {
            state.accounts = []
            console.log(action.error.message)
        })
    }
})

export const { setLogout, editUser } = userSlice.actions
export default userSlice