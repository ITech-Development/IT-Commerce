import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: "",
    categoryId: 0,
    typeId: 0,
    image: null, // Initialize image as null,
    description: "",
    minimumOrder: 1,
    unitPrice: 1,
    weight: 1,
    height: 1,
    width: 1,
    length: 1,
    stock: 1,
    productOwnerId: 0,
    // Tambahkan atribut lainnya jika perlu
  });

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProduct({ ...product, image: imageFile });
  };

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
      const response = await axios.get('https://indoteknikserver-732012365989.herokuapp.com/product-categories');
      setCategoryOptions(response.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data kategori:', error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://indoteknikserver-732012365989.herokuapp.com/product-types');
      setTypeOptions(response.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data kategori:', error);
    }
  };

  const fetchProductOwners = async () => {
    try {
      const response = await axios.get('https://indoteknikserver-732012365989.herokuapp.com/product-owners');
      setProductOwnerOptions(response.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data kategori:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`https://indoteknikserver-732012365989.herokuapp.com/products/${id}`);
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
      const response = await axios.put(`https://indoteknikserver-732012365989.herokuapp.com/products/${id}`, product, {
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          access_token: localStorage.getItem('access_token'),
          // Tambahkan header lainnya sesuai kebutuhan
        },
      });

      if (response.status === 200) {
        // Jika berhasil, Anda dapat melakukan redirect ke halaman lain atau memberikan notifikasi berhasil edit produk.
        // Contoh:
        navigate('/')
        console.log('Produk berhasil diupdate.');
      } else {
        console.error('Terjadi kesalahan saat mengupdate produk.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Edit Produk</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama Produk:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Kategori</option>
            {categoryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="typeId"
            value={product.typeId}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Type</option>
            {typeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <br />
        </div>{" "}
        <div className="form-group">
          {/* Tambahkan input form lainnya sesuai atribut yang ada pada produk */}
          <label htmlFor="image">Gambar:</label>
          <input
            type="file"
            id="image"
            name="image"
            // value={product.image}
            accept="image/*"
            onChange={handleImageChange}
          />
          {product.image && <img src={product.image} alt="Product" width="200px" />}
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="description">Deskripsi:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="minimumOrder">Minimum Order:</label>
          <input
            type="number"
            id="minimumOrder"
            name="minimumOrder"
            value={product.minimumOrder}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="unitPrice">Harga Satuan:</label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={product.unitPrice}
            onChange={handleChange}
            min="0"
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="stock">Stok:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="weight">Berat:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="height">Tinggi:</label>
          <input
            type="number"
            id="height"
            name="height"
            value={product.height}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="width">Lebar:</label>
          <input
            type="number"
            id="width"
            name="width"
            value={product.width}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="length">Panjang:</label>
          <input
            type="number"
            id="length"
            name="length"
            value={product.length}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="productOwner">Product Owner:</label>
          <select
            id="productOwner"
            name="productOwnerId"
            value={product.productOwnerId}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Type</option>
            {productOwnerOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <br />
        </div>
        <div className="button-group">
          <button type="submit">Simpan Perubahan</button>
          <Link to="/">
            <button>Kembali</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
