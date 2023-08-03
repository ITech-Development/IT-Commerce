import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EditProductPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: '',
        categoryId: 0,
        typeId: 0,
        image: '',
        condition: '',
        description: '',
        minimumOrder: 1,
        unitPrice: 0,
        status: '',
        stock: 1,
        weight: 1,
        size: 1,
        shippingInsurance: '',
        deliveryService: '',
        brand: '',
        // Tambahkan atribut lainnya jika perlu
    });

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [productOwnerOptions, setProductOwnerOptions] = useState([]);
    
    useEffect(() => {
        fetchCategories();
        fetchTypes();
        fetchProductData();
        fetchProductOwners();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3100/product-categories');
            setCategoryOptions(response.data);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data kategori:', error);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3100/product-types');
            setTypeOptions(response.data);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data kategori:', error);
        }
    };

    const fetchProductOwners = async () => {
        try {
            const response = await axios.get('http://localhost:3100/product-owners');
            setProductOwnerOptions(response.data);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data kategori:', error);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:3100/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data produk:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3100/products/${id}`, product, {
                headers: {
                    'Content-Type': 'application/json',
                    access_token: localStorage.getItem('access_token'),
                    // Tambahkan header lainnya sesuai kebutuhan
                },
            });

            if (response.status === 201) {
                // Jika berhasil, Anda dapat melakukan redirect ke halaman lain atau memberikan notifikasi berhasil edit produk.
                // Contoh:
                window.location.href = '/products';
                console.log('Produk berhasil diupdate.');
            } else {
                console.error('Terjadi kesalahan saat mengupdate produk.');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    return (
        <div>
            <h1>Edit Produk</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nama Produk:</label>
                <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
                <br />

                <label htmlFor="category">Kategori:</label>
                <select id="category" name="categoryId" value={product.categoryId} onChange={handleChange} required>
                    <option value="">Pilih Kategori</option>
                    {categoryOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="type">Type:</label>
                <select id="type" name="typeId" value={product.typeId} onChange={handleChange} required>
                    <option value="">Pilih Type</option>
                    {typeOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />

                {/* Tambahkan input form lainnya sesuai atribut yang ada pada produk */}
                <label htmlFor="image">Gambar:</label>
                <input type="text" id="image" name="image" value={product.image} onChange={handleChange} required />
                <br />

                <label htmlFor="description">Deskripsi:</label>
                <textarea id="description" name="description" value={product.description} onChange={handleChange} required />
                <br />
                <label htmlFor="minimumOrder">Minimum Order:</label>
                <input type="number" id="minimumOrder" name="minimumOrder" value={product.minimumOrder} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="unitPrice">Harga Satuan:</label>
                <input type="number" id="unitPrice" name="unitPrice" value={product.unitPrice} onChange={handleChange} min="0" required />
                <br />

                <label htmlFor="stock">Stok:</label>
                <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="weight">Berat:</label>
                <input type="number" id="weight" name="weight" value={product.weight} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="height">Tinggi:</label>
                <input type="number" id="height" name="height" value={product.height} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="width">Lebar:</label>
                <input type="number" id="width" name="width" value={product.width} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="productOwner">Product Owner:</label>
                <select id="productOwner" name="productOwnerId" value={product.productOwnerId} onChange={handleChange} required>
                    <option value="">Pilih Type</option>
                    {productOwnerOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />

                <button type="submit">Simpan Perubahan</button>
                <Link to="/products">
                    <button>Kembali</button>
                </Link>
            </form>
        </div>
    );
};

export default EditProductPage;