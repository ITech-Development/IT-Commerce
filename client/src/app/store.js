import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../features/product/apiProducts'
import { usersApi } from '../features/user/apiUser'
import { cartsApi } from '../features/cart/apiCarts'
import { adminSellersApi } from '../features/adminSeller/apiAdminSeller'
import { rajaOngkirApi } from '../features/rajaOngkir/apiRajaOngkir'
import cartReducer from '../features/cart/cartSlice'

export default configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [cartsApi.reducerPath]: cartsApi.reducer,
        [adminSellersApi.reducerPath]: adminSellersApi.reducer,
        [rajaOngkirApi.reducerPath]: rajaOngkirApi.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(usersApi.middleware)
            .concat(cartsApi.middleware)
            .concat(adminSellersApi.middleware)
            .concat(rajaOngkirApi.middleware)
    },

})


