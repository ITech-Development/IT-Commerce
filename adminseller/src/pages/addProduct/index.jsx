import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        typeId: '',
        // Add more fields here according to your requirements
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., send formData to the server
        console.log(formData);
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categories</label>
                    <input
                        type="number"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                    />
                    <select name="" id="">
                        <option value="">test</option>
                        <option value="">tis</option>
                    </select>
                </div>
                <div>
                    <label>Types</label>
                    <input
                        type="number"
                        name="typeId"
                        value={formData.typeId}
                        onChange={handleChange}
                        required
                    />
                    <select name="" id="">
                        <option value="">test</option>
                        <option value="">tis</option>
                    </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Condition:</label>
                    <input
                        type="text"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Minimum Order:</label>
                    <input
                        type="number"
                        name="minimumOrder"
                        value={formData.minimumOrder}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Unit Price:</label>
                    <input
                        type="number"
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Delivery Service:</label>
                    <input
                        type="text"
                        name="deliveryService"
                        value={formData.deliveryService}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="authorId"
                        value={formData.authorId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Voucher:</label>
                    <input
                        type="text"
                        name="vucherId"
                        value={formData.vucherId}
                        onChange={handleChange}
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
