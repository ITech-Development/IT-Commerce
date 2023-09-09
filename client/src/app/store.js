import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../features/product/productSlice'
import { usersApi } from '../features/user/userSlice'

export default configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(usersApi.middleware)
    },

})


