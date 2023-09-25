import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../features/product/apiProducts'
import { usersApi } from '../features/user/apiUser'
import  cartReducer  from '../features/cart/cartSlice'

export default configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(usersApi.middleware)
    },

})


