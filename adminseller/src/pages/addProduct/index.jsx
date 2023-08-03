import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./addProductStyle.css";

const AddProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: 0,
    typeId: 0,
    image: "",
    condition: "",
    description: "",
    minimumOrder: 1,
    unitPrice: 1,
    status: "",
    stock: 1,
    weight: 1,
    size: 1,
    shippingInsurance: "",
    deliveryService: "",
    brand: "",
    // Tambahkan atribut lainnya jika perlu
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3100/product-categories");
      setCategoryOptions(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data kategori:", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3100/product-types");
      setTypeOptions(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data tipe:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3100/products",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
            // Tambahkan header lainnya sesuai kebutuhan
          },
        }
      );

      if (response.status === 201) {
        window.location.href = "/products";
        console.log("Produk berhasil ditambahkan.");
      } else {
        console.error("Terjadi kesalahan saat menyimpan produk.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Tambah Produk Baru</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama Produk:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
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
            value={newProduct.categoryId}
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
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="typeId"
            value={newProduct.typeId}
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
        </div>

        {/* Tambahkan input form lainnya sesuai atribut yang ada pada produk */}
        <div className="form-group">
          <label htmlFor="image">Gambar:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Kondisi:</label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={newProduct.condition}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="description">Deskripsi:</label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="minimumOrder">Minimum Order:</label>
          <input
            type="number"
            id="minimumOrder"
            name="minimumOrder"
            value={newProduct.minimumOrder}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="unitPrice">Harga Satuan:</label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={newProduct.unitPrice}
            onChange={handleChange}
            min="0"
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={newProduct.status}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stok:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Berat:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={newProduct.weight}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="size">Ukuran:</label>
          <input
            type="number"
            id="size"
            name="size"
            value={newProduct.size}
            onChange={handleChange}
            min="1"
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="shippingInsurance">Asuransi Pengiriman:</label>
          <input
            type="text"
            id="shippingInsurance"
            name="shippingInsurance"
            value={newProduct.shippingInsurance}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="deliveryService">Layanan Pengiriman:</label>
          <input
            type="text"
            id="deliveryService"
            name="deliveryService"
            value={newProduct.deliveryService}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand :</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={newProduct.brand}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className="button-group">
          <button type="submit">Tambahkan Produk</button>
          <Link to="/products">
            <button>Kembali</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
