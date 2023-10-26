import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./addStyleProducts.css";
import styled from "styled-components";

const TextAreaContainer = styled.div`
  margin: 30px 22px 0 0px;
  width: 49%;
  font-family: "Arial", sans-serif;
`;

const DescriptionTextArea = styled.textarea`
  width: 100%;
  min-height: 125px;
  resize: vertical;
  height: auto; /* Mengatur tinggi otomatis */
`;

const AddProductPage = () => {
  // State untuk menyimpan data produk yang akan ditambahkan
  const [newProduct, setNewProduct] = useState({
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

  const navigate = useNavigate();

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
    fetchTypes();
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
      console.error("Terjadi kesalahan saat mengambil data type:", error);
    }
  };

  const fetchProductOwners = async () => {
    try {
      const response = await axios.get(
        "https://indoteknikserver-732012365989.herokuapp.com/product-owners"
      );
      setProductOwnerOptions(response.data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil data product owner:",
        error
      );
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
      formData.append("name", newProduct.name);
      formData.append("categoryId", newProduct.categoryId);
      formData.append("typeId", newProduct.typeId);
      formData.append("description", newProduct.description);
      formData.append("minimumOrder", newProduct.minimumOrder);
      formData.append("unitPrice", newProduct.unitPrice);
      formData.append("stock", newProduct.stock);
      formData.append("weight", newProduct.weight);
      formData.append("height", newProduct.height);
      formData.append("width", newProduct.width);
      formData.append("length", newProduct.length);
      formData.append("productOwnerId", newProduct.productOwnerId);
      // ...add other properties to the formData...

      // Append the image file to the formData
      formData.append("image", newProduct.image);
      const response = await axios.post(
        "https://indoteknikserver-732012365989.herokuapp.com/products",
        newProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
            access_token: localStorage.getItem("access_token"), // Contoh: mengatur token otorisasi
            // Tambahkan header lainnya sesuai kebutuhan
          },
        }
      );

      if (response.status === 201) {
        // Jika berhasil, Anda dapat melakukan redirect ke halaman lain atau memberikan notifikasi berhasil tambah produk.
        // Contoh:
        navigate("/");
        console.log("Produk berhasil ditambahkan.");
      } else {
        // Jika terjadi kesalahan saat menyimpan produk di server, Anda dapat menampilkan pesan error atau melakukan tindakan lainnya.
        console.error("Terjadi kesalahan saat menyimpan produk.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Tambah Produk</h2>
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
                value={newProduct.name}
                onChange={handleChange}
                required
                placeholder="Contoh: Turbo Cartridge Canter PS 125 TD05H-14G 4D34T"
              />
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: "13px",
                  maxWidth: "350px",
                }}
              >
                Tips: Jenis Produk + Merek Produk + Keterangan Tambahan
              </p>
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
                value={newProduct.typeId}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Brand</option>
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
                value={newProduct.productOwnerId}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Product Owner</option>
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
                onChange={handleImageChange}
                required
              />
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
            <TextAreaContainer>
              <DescriptionTextArea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
            </TextAreaContainer>
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
                type="text"
                id="minimumOrder"
                name="minimumOrder"
                value={newProduct.minimumOrder}
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
                type="text"
                id="unitPrice"
                name="unitPrice"
                value={newProduct.unitPrice}
                onChange={handleChange}
                pattern="[0-9]*"
                inputMode="numeric"
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
                type="text"
                id="stock"
                name="stock"
                value={newProduct.stock}
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
                  value={newProduct.weight}
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
                  fontSize: "14px",
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
                id="length"
                name="length"
                value={newProduct.length}
                onChange={handleChange}
                required
                placeholder="Panjang"
              />
              <p
                style={{
                  position: "relative",
                  top: "-2px",
                  left: "-55px",
                  fontSize: "14px",
                }}
              >
                cm
              </p>
              <input
                type="text"
                id="width"
                name="width"
                value={newProduct.width}
                onChange={handleChange}
                required
                placeholder="Lebar"
              />
              <p
                style={{
                  position: "relative",
                  top: "-2px",
                  left: "-55px",
                  fontSize: "14px",
                }}
              >
                cm
              </p>
              <input
                type="text"
                id="height"
                name="height"
                value={newProduct.height}
                onChange={handleChange}
                required
                placeholder="Tinggi"
              />
              <p
                style={{
                  position: "relative",
                  top: "-2px",
                  left: "-55px",
                  fontSize: "14px",
                }}
              >
                cm
              </p>
            </div>
            <br />
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Tambahkan Produk</button>
          <Link to="/">
            <button>Kembali</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
