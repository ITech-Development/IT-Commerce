import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const AddProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [types, setTypes] = useState([])
    const [image, setImage] = useState('')
    const [condition, setCondition] = useState('')
    const [description, setDescription] = useState('')
    const [minimumOrder, setMinimumOrder] = useState(1)
    const [unitPrice, setUnitPrice] = useState(0)
    const [status, setStatus] = useState('')
    const [stock, setStock] = useState(1)
    const [weight, setWeight] = useState(0)
    const [deliveryService, setDeliveryService] = useState('')


    useEffect(() => {
        // Fetch categories and types from the API backend
        const fetchCategoriesAndTypes = async () => {
            try {
                const categoriesResponse = await axios.get('http://localhost:3100/product-categories');
                const typesResponse = await axios.get('http://localhost:3100/product-types');
                console.log(categoriesResponse.data, 'categoriessssssssss');
                setCategories(categoriesResponse.data); // Set nilai state categories dengan data kategori dari API
                setTypes(typesResponse.data); // Set nilai state types dengan data tipe produk dari API
            } catch (error) {
                console.log(error, 'error fetching categories and types');
            }
        };

        fetchCategoriesAndTypes();
    }, []);


    const handleAddToProduct = async (product) => {
        product.preventDefault()

        const productData = {
            name,
            categories,
            types,
            image,
            condition,
            description,
            minimumOrder,
            unitPrice,
            status,
            stock,
            weight,
            deliveryService,
        };
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            const url = "http://localhost:3100/products"
            try {
                const response = await axios.post(url, product, {
                    headers: { access_token: accessToken }
                })
                console.log(response.data, 'data dari handleAddToProduct');
                clearForm();
            } catch (error) {
                console.log(error, 'error dari handleAddToProduct');
            }
        }
    }

    const clearForm = () => {
        setName('');
        setCategories('');
        setTypes('');
        setImage('');
        setCondition('');
        setDescription('');
        setMinimumOrder(0);
        setUnitPrice(0);
        setStatus('');
        setStock(0);
        setWeight(0);
        setDeliveryService('');

        // setVouchers('');
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleAddToProduct}>
                <div>
                    <label>Name: {' '}</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(product) => setName(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Categories: {' '}</label>
                    <select
                        name="categories"
                        value={categories}
                        onChange={(product) => setCategories(product.target.value)}
                        required
                    >
                        <option value="">-- Select a category --</option>
                        {categories.map((category) => ( 
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Types: {' '}</label>
                    <select
                        name="types"
                        value={types}
                        onChange={(product) => setTypes(product.target.value)}
                        required
                    >
                        <option value="">-- Select a type --</option>
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Image: {' '}</label>
                    <input
                        type="text"
                        name="image"
                        value={image}
                        onChange={(product) => setImage(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Condition: {' '}</label>
                    <input
                        type="text"
                        name="condition"
                        value={condition}
                        onChange={(product) => setCondition(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description: {' '}</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(product) => setDescription(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Minimum Order: {' '}</label>
                    <input
                        type="number"
                        name="minimumOrder"
                        value={minimumOrder}
                        onChange={(product) => setMinimumOrder(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Unit Price: {' '}</label>
                    <input
                        type="number"
                        name="unitPrice"
                        value={unitPrice}
                        onChange={(product) => setUnitPrice(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status: {' '}</label>
                    <input
                        type="text"
                        name="status"
                        value={status}
                        onChange={(product) => setStatus(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Stock: {' '}</label>
                    <input
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={(product) => setStock(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Weight: {' '}</label>
                    <input
                        type="number"
                        name="weight"
                        value={weight}
                        onChange={(product) => setWeight(product.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Delivery Service: {' '}</label>
                    <input
                        type="text"
                        name="deliveryService"
                        value={deliveryService}
                        onChange={(product) => setDeliveryService(product.target.value)}
                        required
                    />
                </div>
                {/* Add more input fields for other product details here */}
                <div>
                    <button type="submit">Add Product</button>
                </div>
                <div>
                    <Link to="/dashboard">
                        <button>Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
