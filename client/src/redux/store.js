import { configureStore } from '@reduxjs/toolkit'
import userSlice, {userLogin, getProfile}  from './userSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false
    },
    userLogin, getProfile
  )
})

export default store