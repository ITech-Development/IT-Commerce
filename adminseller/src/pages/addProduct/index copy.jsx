import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const AddProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [categoryId, setCategoryId] = useState('');
    const [typeId, setTypeId] = useState('');
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
        // Fetch categories data from the API
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3100/product-categories');
                setCategoryId(response.data); // Assuming the API returns an array of categories objects
            } catch (error) {
                console.log(error); // Handle error appropriately (e.g., show error message)
            }
        };
        fetchCategories();
    }, []);


    const handleAddToProduct = async (event) => {
        event.preventDefault();

        // Prepare product data
        const productData = {
            name,
            categoryId,
            typeId,
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

        // Check for an access token
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            const url = 'http://localhost:3100/products';
            try {
                const response = await axios.post(url, productData, {
                    headers: { access_token: accessToken },
                });
                console.log(response.data, 'data dari handleAddToProduct');
                clearForm(); // Reset form fields after successful product addition
            } catch (error) {
                console.log(error, 'error dari handleAddToProduct');
            }
        }
    };


    const clearForm = () => {
        setName('');
        setCategoryId('');
        setTypeId('');
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

                    />
                </div>
                <div>
                <label>Categories: {' '}</label>
                <select
                    name="categoryId"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                >
                    <option value="">Select a category</option>
                    <option value={categoryId.id}>{categoryId.name}</option>
                </select>
            </div>

                <div>
                    <label>Types: {' '}</label>

                </div>
                <div>
                    <label>Image: {' '}</label>
                    <input
                        type="text"
                        name="image"
                        value={image}
                        onChange={(product) => setImage(product.target.value)}
                    />
                </div>
                <div>
                    <label>Condition: {' '}</label>
                    <input
                        type="text"
                        name="condition"
                        value={condition}
                        onChange={(product) => setCondition(product.target.value)}

                    />
                </div>
                <div>
                    <label>Description: {' '}</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(product) => setDescription(product.target.value)}

                    />
                </div>
                <div>
                    <label>Minimum Order: {' '}</label>
                    <input
                        type="number"
                        name="minimumOrder"
                        value={minimumOrder}
                        onChange={(product) => setMinimumOrder(product.target.value)}

                    />
                </div>
                <div>
                    <label>Unit Price: {' '}</label>
                    <input
                        type="number"
                        name="unitPrice"
                        value={unitPrice}
                        onChange={(product) => setUnitPrice(product.target.value)}

                    />
                </div>
                <div>
                    <label>Status: {' '}</label>
                    <input
                        type="text"
                        name="status"
                        value={status}
                        onChange={(product) => setStatus(product.target.value)}

                    />
                </div>
                <div>
                    <label>Stock: {' '}</label>
                    <input
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={(product) => setStock(product.target.value)}

                    />
                </div>
                <div>
                    <label>Weight: {' '}</label>
                    <input
                        type="number"
                        name="weight"
                        value={weight}
                        onChange={(product) => setWeight(product.target.value)}

                    />
                </div>
                <div>
                    <label>Delivery Service: {' '}</label>
                    <input
                        type="text"
                        name="deliveryService"
                        value={deliveryService}
                        onChange={(product) => setDeliveryService(product.target.value)}

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
