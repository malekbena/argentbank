import { configureStore } from '@reduxjs/toolkit'
import userSlice, {userLogin, getProfile, getAccounts}  from './userSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false
    },
    userLogin, getProfile, getAccounts
  )
})


export default store