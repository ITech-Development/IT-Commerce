import React, { useEffect, useState } from 'react';
// import './Card.css';
import axios from 'axios';

const Card = () => {

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    console.log(setProducts, 'heheheh');

    useEffect(() => {
        // Fungsi untuk mengambil data dari API backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3100/products'); // Ganti URL dengan URL API backend yang sesuai
                setProducts(response.data); // Set data card ke state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, []); // Menggunakan array kosong sebagai dependencies agar efeknya hanya dilakukan saat komponen ini pertama kali dipanggil

    useEffect(() => {
        // Fungsi untuk mengambil data dari API backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3100/users', {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                }); // Ganti URL dengan URL API backend yang sesuai
                setUsers(response.data); // Set data card ke state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []); // Menggunakan array kosong sebagai dependencies agar efeknya hanya dilakukan saat komponen ini pertama kali dipanggil

    return (
        <div className="card flex">
            <img src="https://image.pngaaa.com/123/2193123-middle.png" alt="Card Image" className="card-image" width="200px" height="100px" />
            <div className="card-content">
                <h2 className="card-title">Total Products</h2>
                <p className="card-description">Description products</p>
                <h4 className="total-products">{products.length} Products</h4>
            </div>
            <img src="https://e7.pngegg.com/pngimages/389/412/png-clipart-font-awesome-computer-icons-user-profile-users-group-blind-miscellaneous-blue.png" alt="Card Image" className="card-image" width="200px" height="100px" />
            <div className="card-content">
                <h2 className="card-title">Total Users</h2>
                <p className="card-description">Description users</p>
                <h4 className="total-users">{users.length} Users</h4>
            </div>
            <img src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-simple-medal-of-honor-linear-icon-png-image_6074699.png" alt="Card Image" className="card-image" width="200px" height="100px" />
            <div className="card-content">
                <h2 className="card-title">Total Poins</h2>
                <p className="card-description">Description poins</p>
                <h4 className="total-poins">your point here, Points</h4>
            </div>
        </div>
    );
};

export default Card;
