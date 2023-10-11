// reducers/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
// Fungsi untuk mengambil keranjang dari local storage saat aplikasi dimuat
const loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : { items: [] };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            // Simpan data keranjang ke local storage setelah perubahan
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
