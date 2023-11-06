import React from 'react';
import { useGetWishlistsQuery, useRemoveWishlistMutation } from '../../features/wishlist/apiWishlist';
import { Link } from 'react-router-dom';

function Wishlist() {
    // Menggunakan hook useGetWishlistsQuery untuk mengambil daftar wishlist dari API
    const { data: wishlists, isError, isLoading } = useGetWishlistsQuery();
    const [removeWishlist] = useRemoveWishlistMutation()

    if (isLoading) {
        return <div>Sedang memuat...</div>;
    }

    if (isError) {
        return <div>Terjadi kesalahan saat mengambil data wishlist.</div>;
    }

    const handleRemoveFromWishlist = async (wishlistId) => {
        try {
            // Call the removeWishlist mutation with the wishlist ID
            await removeWishlist(wishlistId);
        } catch (error) {
            console.error('Error removing item from wishlist', error);
        }
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <h2>Wishlist Produk</h2>
            <ul>
                {wishlists.map((wishlist) => (
                    <li key={wishlist.id}>
                        <Link to={`${wishlist.product.id}`}>
                            {wishlist.product.name} - {wishlist.product.unitPrice}
                            <br />
                            <img src={wishlist.product.image} alt={wishlist.product.name} width='150' />
                        </Link>
                        <br />
                        <button onClick={() => handleRemoveFromWishlist(wishlist.id)}>
                            Delete
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Wishlist;
