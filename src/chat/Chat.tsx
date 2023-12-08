import './Chat.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5174");

export default function ChatRoom() {
  socket.connect();
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState<Array<{ message: string; senderId: string }>>([]);
  const [messages, setMessages] = useState<Array<{ message: string; senderId: string }>>([]);

  const sendMessage = () => {
    const newMessage = { message, senderId: socket.id };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    socket.emit('sendMessage', newMessage);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages(prevMessages => [
        ...prevMessages,
        { message: data.message, senderId: data.senderId }
      ]);
    });
  }, []);

  return (
    <div className="chat">
      <main>
        {messages.map((msg, index) => (
          <div key={index} className={msg.senderId === socket.id ? 'sent' : 'received'}>
            <p>{msg.message}</p>
            <p>Send by: {msg.senderId}</p>
          </div>
        ))}
      </main>
      <div className="manage">
        <input
          placeholder='Write smth nice'
          type="text"
          className="msg-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn" onClick={sendMessage}>
          <i className="far fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
