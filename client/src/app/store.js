import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../features/apiProducts'


export default configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(productsApi.middleware)
    },
})