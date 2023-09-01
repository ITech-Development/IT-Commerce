import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your server URL

const UserChat = ({ userId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('join', { userId, userName, userType: 'user' });

    // Listen for incoming messages from the server
    socket.on('chatMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, { user: data.user, message: data.message }]);
    });

    return () => {
      // Clean up event listener when the component unmounts
      socket.off('chatMessage');
    };
  }, [userId, userName]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>User Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default UserChat;
