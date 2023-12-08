import './Chat.css'
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5174");

export default function ChatRoom() {
	socket.connect();
	const [message, setMessage] = useState('');
	const [ messageReceived, setMessageReceived ] = useState('')
	const sendMessage = () => {
		socket.emit('sendMessage', { message });
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageReceived(data.message)
		})
		console.log(messageReceived)
	}, [socket]);



  return (
    <div className="chat">
      <main></main>
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
