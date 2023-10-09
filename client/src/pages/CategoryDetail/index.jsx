import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductCategoriesQuery } from '../../features/product/apiProducts';

const CategoryDetail = () => {
    const { id } = useParams(); // Mendapatkan id dari URL
    const { data: categories } = useGetProductCategoriesQuery(); // Menggunakan query yang sudah didefinisikan sebelumnya

    const [category, setCategory] = useState(null);
    console.log(category, 'test');

    useEffect(() => {
        if (categories) {
            // Cari kategori berdasarkan id
            const selectedCategory = categories.find((cat) => cat.id === parseInt(id, 10));
            setCategory(selectedCategory);
        }
    }, [id, categories]);

    if (!category) {
        return <div>Loading...</div>;
    }

    // Check if there are products in the category
    const hasProducts = category.categories && category.categories.length > 0;

    return (
        <div>
            <br />
            <br />
            <br />
            <h2>Kategori Produk: {category.name}</h2>

            {hasProducts ? (
                <div>
                    <h3>Daftar Produk dalam Kategori</h3>
                    <ul>
                        {category.categories.map((product) => (
                            <li key={product.id}>
                                <img src={product.image} alt={product.name} width='200' />
                                <p>Nama Produk: {product.name}</p>
                                {/* Tambahkan informasi produk lainnya sesuai kebutuhan */}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Produk belum tersedia dengan kategori ini</p>
            )}
        </div>
    );
};

export default CategoryDetail;
