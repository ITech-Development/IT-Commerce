import { configureStore } from '@reduxjs/toolkit'
import { adminSellersApi } from '../features/adminSeller/apiAdminSellers'
import { eventProductsApi } from '../features/eventProduct/apiEventProducts'
import { eventsApi } from '../features/event/apiEvents'
import { productsApi } from '../features/product/apiProducts'

export default configureStore({
    reducer: {
        [adminSellersApi.reducerPath]: adminSellersApi.reducer,
        [eventProductsApi.reducerPath]: eventProductsApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(adminSellersApi.middleware)
            .concat(eventProductsApi.middleware)
            .concat(eventsApi.middleware)
            .concat(productsApi.middleware)
    },
})