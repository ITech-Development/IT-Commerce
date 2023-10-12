import { configureStore } from '@reduxjs/toolkit'
import { adminSellersApi } from '../features/adminSeller/apiAdminSellers'


export default configureStore({
    reducer: {
        [adminSellersApi.reducerPath]: adminSellersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(adminSellersApi.middleware)
    },

})


