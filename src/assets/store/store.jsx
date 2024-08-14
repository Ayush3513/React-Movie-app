import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducer/movieSlice'
import tvReducer from './reducer/tvSlice'
import personReducer from './reducer/personSlice'


export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer,
    
  },
})