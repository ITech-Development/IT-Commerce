// Products.js
import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';

const API_URL = "http://localhost:3100/products"; // Ganti dengan URL API produk Anda

const Products = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error, "Terjadi kesalahan.");
      });
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Gambar Produk</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Tipe</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Harga Satuan</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>Berat</TableCell>
              <TableCell>Tinggi</TableCell>
              <TableCell>Lebar</TableCell>
              <TableCell>Panjang</TableCell>
              <TableCell>Product Owner</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell><img src={product.image} alt="" width='100'/></TableCell>
                <TableCell>{product.categories.name}</TableCell>
                <TableCell>{product.types.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.unitPrice}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.height}</TableCell>
                <TableCell>{product.width}</TableCell>
                <TableCell>{product.length}</TableCell>
                <TableCell>{product.product_owners?.name}</TableCell>
                <TableCell>{product.authors?.fullName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
