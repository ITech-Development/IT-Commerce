import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        categoryId: '',
        typeId: '',
        image: '',
        condition: '',
        description: '',
        minimumOrder: 1,
        unitPrice: 0,
        status: '',
        weight: 0,
        size: 0,
        stock: 0,
        shippingInsurance: '',
        deliveryService: '',
        brand: '',
        voucherId: null,
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Panggil API endpoint untuk mendapatkan daftar kategori
        axios.get('http://localhost:3100/product-categories')
            .then((response) => {
                // Setel state 'categories' dengan data kategori dari backend
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []); // Hanya akan dijalankan saat komponen pertama kali dimuat


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mengatur headers untuk permintaan POST
        const headers = {
            access_token: localStorage.getItem('access_token')
            // Jika diperlukan, Anda juga dapat menambahkan header otorisasi di sini
            // 'Authorization': 'Bearer ' + YOUR_ACCESS_TOKEN,
        };

        // Kirim data produk ke backend menggunakan Axios (metode POST)
        axios.post('http://localhost:3100/products', product, { headers })
            .then((response) => {
                // Berhasil menambahkan produk ke backend, lakukan sesuatu jika perlu
                console.log('Product added successfully:', response.data);
                // Reset form setelah produk berhasil ditambahkan
                setProduct({
                    name: '',
                    categoryId: '',
                    typeId: '',
                    image: '',
                    condition: '',
                    description: '',
                    minimumOrder: 1,
                    unitPrice: 0,
                    status: '',
                    weight: 0,
                    size: 0,
                    stock: 0,
                    shippingInsurance: '',
                    deliveryService: '',
                    brand: '',
                    voucherId: null,
                });
            })
            .catch((error) => {
                // Gagal menambahkan produk ke backend, tangani kesalahan jika perlu
                console.error('Error adding product:', error);
            });
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Category:
                    <select
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                {/* Add more input fields for other properties as needed */}
                <br />
                <button type="submit">Add Product</button>
            </form>
        </div>
    )

};

export default ProductForm;
