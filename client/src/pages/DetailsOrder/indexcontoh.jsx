import React, { useState } from 'react';

const IncrementPurchasePoints = () => {
  const [userId, setUserId] = useState('');
  const [incrementValue, setIncrementValue] = useState(1); // Default increment value is 1
  const [message, setMessage] = useState('');

  const handleIncrement = () => {

    const incrementValueInt = parseInt(incrementValue, 10);
    fetch(`https://indoteknikserver-732012365989.herokuapp.com/users/incrementPurchasePoints/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({ incrementValue: incrementValueInt }), // Kirim sebagai bilangan bulat
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Increment Purchase Points</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <label>
        Increment Value:
        <input
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(e.target.value)}
        />
      </label>
      <button onClick={handleIncrement}>Increment Points</button>
      <p>{message}</p>
    </div>
  );
};

export default IncrementPurchasePoints;
