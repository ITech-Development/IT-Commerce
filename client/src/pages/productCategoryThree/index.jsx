import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3100";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3100/products/category-thre');
            const jsonData = response.data;
            setData(Array.isArray(jsonData) ? jsonData : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="App">
            <h1>API Card Demo</h1>
            {data.length === 0 ? (
                <p>Data tidak tersedia</p>
            ) : (
                <div className="card-container">
                    {data.map(item => (
                        <div key={item.id} className="card">
                            <h2>{item.name}</h2>
                            <img src={`${API_URL}/${item.image}`} alt={item.name} width="200px" />
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
