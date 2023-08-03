import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddProductPage = () => {
    // State untuk menyimpan data produk yang akan ditambahkan
    const [newProduct, setNewProduct] = useState({
        name: '',
        categoryId: 0,
        typeId: 0,
        image: null, // Initialize image as null,
        description: '',
        minimumOrder: 1,
        unitPrice: 1,
        weight: 1,
        height: 1,
        width: 1,
        stock: 1,
        productOwnerId: 0,
        // Tambahkan atribut lainnya jika perlu
    });

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setNewProduct({ ...newProduct, image: imageFile });
    };


    const [categoryOptions, setCategoryOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [productOwnerOptions, setProductOwnerOptions] = useState([]);

    useEffect(() => {
        // Ambil data kategori dari server saat komponen dipasang (mounted)
        fetchCategories();
        fetchTypes()
        fetchProductOwners()
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
            console.error('Terjadi kesalahan saat mengambil data type:', error);
        }
    };

    const fetchProductOwners = async () => {
        try {
            const response = await axios.get('http://localhost:3100/product-owners');
            setProductOwnerOptions(response.data);
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data product owner:', error);
        }
    };

    // Handler untuk mengubah nilai input pada form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Handler untuk mengirimkan data produk baru
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a new FormData object to send both text and file data
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('categoryId', newProduct.categoryId);
            formData.append('typeId', newProduct.typeId);
            formData.append('description', newProduct.description);
            formData.append('minimumOrder', newProduct.minimumOrder);
            formData.append('unitPrice', newProduct.unitPrice);
            formData.append('stock', newProduct.stock);
            formData.append('weight', newProduct.weight);
            formData.append('height', newProduct.height);
            formData.append('width', newProduct.width);
            formData.append('width', newProduct.productOwnerId);
            // ...add other properties to the formData...

            // Append the image file to the formData
            formData.append('image', newProduct.image);
            const response = await axios.post('http://localhost:3100/products', newProduct, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
                    access_token: localStorage.getItem('access_token'), // Contoh: mengatur token otorisasi
                    // Tambahkan header lainnya sesuai kebutuhan
                },
            });

            if (response.status === 201) {
                // Jika berhasil, Anda dapat melakukan redirect ke halaman lain atau memberikan notifikasi berhasil tambah produk.
                // Contoh:
                window.location.href = '/products';
                console.log('Produk berhasil ditambahkan.');
            } else {
                // Jika terjadi kesalahan saat menyimpan produk di server, Anda dapat menampilkan pesan error atau melakukan tindakan lainnya.
                console.error('Terjadi kesalahan saat menyimpan produk.');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    };

    return (
        <div>
            <h1>Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nama Produk:</label>
                <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} required />
                <br />

                <label htmlFor="category">Kategori:</label>
                <select id="category" name="categoryId" value={newProduct.categoryId} onChange={handleChange} required>
                    <option value="">Pilih Kategori</option>
                    {categoryOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
                <br />

                <label htmlFor="type">Type:</label>
                <select id="type" name="typeId" value={newProduct.typeId} onChange={handleChange} required>
                    <option value="">Pilih Type</option>
                    {typeOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
                <br />

                <label htmlFor="image">Gambar:</label>
                <input type="file" id="image" name="image" onChange={handleImageChange} required />
                <br />

                <label htmlFor="description">Deskripsi:</label>
                <textarea id="description" name="description" value={newProduct.description} onChange={handleChange} required />
                <br />
                <label htmlFor="minimumOrder">Minimum Order:</label>
                <input type='number' id="minimumOrder" name="minimumOrder" value={newProduct.minimumOrder} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="unitPrice">Harga Satuan:</label>
                <input type="number" id="unitPrice" name="unitPrice" value={newProduct.unitPrice} onChange={handleChange} min="0" required />
                <br />

                <label htmlFor="stock">Stok:</label>
                <input type="number" id="stock" name="stock" value={newProduct.stock} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="weight">Berat:</label>
                <input type="number" id="weight" name="weight" value={newProduct.weight} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="height">Tinggi:</label>
                <input type="number" id="height" name="height" value={newProduct.height} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="width">Lebar:</label>
                <input type="number" id="width" name="width" value={newProduct.width} onChange={handleChange} min="1" required />
                <br />

                <label htmlFor="productOwner">Product Owner:</label>
                <select id="productOwner" name="productOwnerId" value={newProduct.productOwnerId} onChange={handleChange} required>
                    <option value="">Pilih Product Owner</option>
                    {productOwnerOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
                <br />

                <button type="submit">Tambahkan Produk</button>
                <Link to='/products'>
                    <button >Kembali</button>
                </Link>
            </form>
        </div>
    );
};

export default AddProductPage;