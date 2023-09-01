import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      const response = await axios.get(
        "https://indoteknikserver-732012365989.herokuapp.com/product-categories"
      );
      setCategoryOptions(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data kategori:", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get(
        "https://indoteknikserver-732012365989.herokuapp.com/product-types"
      );
      setTypeOptions(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data kategori:", error);
    }
  };

  const fetchProductOwners = async () => {
    try {
      const response = await axios.get(
        "https://indoteknikserver-732012365989.herokuapp.com/product-owners"
      );
      setProductOwnerOptions(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data kategori:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `https://indoteknikserver-732012365989.herokuapp.com/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data produk:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://indoteknikserver-732012365989.herokuapp.com/products/${id}`,
        product,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
            access_token: localStorage.getItem("access_token"),
            // Tambahkan header lainnya sesuai kebutuhan
          },
        }
      );

      if (response.status === 200) {
        // Jika berhasil, Anda dapat melakukan redirect ke halaman lain atau memberikan notifikasi berhasil edit produk.
        // Contoh:
        navigate("/");
        console.log("Produk berhasil diupdate.");
      } else {
        console.error("Terjadi kesalahan saat mengupdate produk.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Edit Produk</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="outSection">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0 20px 0",
            }}
          >
            <label style={{ fontSize: "18px" }}>Informasi Produk</label>
            <label style={{ fontWeight: "normal", fontSize: "13px" }}>
              Pastikan produk tidak melanggar Hak Kekayaan Intelektual supaya
              produkmu tidak diturunkan.
            </label>
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Nama Produk</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Nama produk min. 40 karakter dengan memasukkan merek, jenis
                produk, warna, bahan, atau tipe. <br />
                Disarankan untuk tidak menggunakan huruf kapital berlebih,
                memasukkan lebih dari 1 merek, dan kata-kata promosi.
                <br />
                Nama tidak bisa diubah setelah produk terjual, ya.
              </p>
            </div>
            <div style={{ marginTop: "30px", width: "50%" }}>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>
            <br />
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Kategori</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Pilih kategori yang sesuai karena biaya layanan akan tergantung
                pada kategori. Jika pemilihan kategori kurang sesuai, maka
                kategori akan diubah oleh Indoteknik
              </p>
            </div>
            <div style={{ marginTop: "30px", width: "51%" }}>
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
            </div>
            <br />
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Brand</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Pilih brand yang sesuai karena biaya layanan akan tergantung
                pada brand. Jika pemilihan brand kurang sesuai, maka brand akan
                diubah oleh Indoteknik
              </p>
            </div>
            <div style={{ marginTop: "30px", width: "51%" }}>
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
            </div>
            <br />
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Pemilik Produk</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Pilih Pemilik Produk
              </p>
            </div>
            <div style={{ margin: "30px 0 0 168px", width: "51%" }}>
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
            </div>
            <br />
          </div>
        </div>
        <div className="outSection">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0 0 0",
            }}
          >
            <label style={{ fontSize: "18px" }}>Detail Produk</label>
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Gambar Produk</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Format gambar .jpg .jpeg .png dan ukuran minimum 300 x 300px
                (Untuk gambar optimal gunakan ukuran minimum 700 x 700 px).
              </p>
            </div>
            <div style={{ margin: "30px 22px 0 0px", width: "49%" }}>
              <input
                type="file"
                id="image"
                name="image"
                // value={product.image}
                accept="image/*"
                onChange={handleImageChange}
              />
              {product.image && (
                <img
                  src={`${API_URL}/${product.image}`}
                  alt="Product"
                  width="200px"
                />
              )}
            </div>
            <br />
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Deskripsi Produk</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Pastikan deskripsi produk memuat penjelasan detail terkait
                produkmu agar pembeli mudah mengerti dan menemukan produkmu.{" "}
                <br />
                <br />
                Disarankan untuk tidak memasukkan info nomor HP, e-mail, dsb. ke
                dalam deskripsi produk untuk melindungi data pribadimu.
              </p>
            </div>
            <div style={{ margin: "30px 22px 0 0px", width: "49%" }}>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
            <br />
          </div>
        </div>
        <div className="outSection">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0 0 0",
            }}
          >
            <label style={{ fontSize: "18px" }}>Harga</label>
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Minimum Pemesanan</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Atur jumlah minimum yang harus dibeli untuk produk ini.
              </p>
            </div>
            <div style={{ margin: "30px 22px 0 0px", width: "49%" }}>
              <input
                type="number"
                id="minimumOrder"
                name="minimumOrder"
                value={product.minimumOrder}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <br />
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Harga Satuan</label>
            </div>
            <div style={{ margin: "30px 0px 0 164px", width: "49%" }}>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                value={product.unitPrice}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <br />
          </div>
        </div>
        <div className="outSection">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0 0 0",
            }}
          >
            <label style={{ fontSize: "18px" }}>Pengelolaan Produk</label>
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px", display: "flex" }}>
                Stok Produk
              </label>
            </div>
            <div style={{ margin: "25px 0px 0 173px", width: "49%" }}>
              <input
                type="number"
                id="stock"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <br />
          </div>
        </div>
        <div className="outSection">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0 0 0",
            }}
          >
            <label style={{ fontSize: "18px" }}>Berat & Pengiriman</label>
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Berat Produk</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Masukkan berat dengan menimbang produk setelah dikemas.
              </p>
            </div>
            <div style={{ margin: "30px 23px 0 0px", width: "49%" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  required
                  placeholder="Berat Produk"
                />
              </div>
              <p
                style={{
                  position: "relative",
                  top: "-41px",
                  left: "528px",
                  fontSize: '14px'
                }}
              >
                gram
              </p>
            </div>
            <br />
          </div>
          <div style={{ color: "#5C8374" }} className="form-group">
            <div style={{ marginTop: "30px" }}>
              <label style={{ fontSize: "18px" }}>Ukuran Produk</label>
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "300px",
                }}
              >
                Masukkan ukuran produk setelah dikemas untuk menghitung berat
                volume
              </p>
            </div>
            <div
              style={{
                margin: "30px 8px 0 21px",
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                height: "40px",
                width: "52%",
              }}
            >
               <input
                type="text"
                id="height"
                name="height"
                value={product.height}
                onChange={handleChange}
                required
                placeholder="Tinggi"
              />
              <p
                style={{
                  position: 'relative',
                  top: "-2px",
                  left: "-55px",
                  fontSize: '14px'
                }}
              >
                cm
              </p>
              <input
                type="text"
                id="width"
                name="width"
                value={product.width}
                onChange={handleChange}
                required
                placeholder="Lebar"
              />
              <p
                style={{
                  position: 'relative',
                  top: "-2px",
                  left: "-55px",
                  fontSize: '14px'
                }}
              >
                cm
              </p>
            </div>
            <br />
          </div>
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
