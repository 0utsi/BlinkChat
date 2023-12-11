import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'
const socket = io("http://localhost:5174");

export default function ChatRoom() {
	socket.connect();
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState<Array<{message: string, socketId: string}>>([]);

	const sendMessage = (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		if(message.length === 0) return
		const messageData = {
			message,
			socketId: socket.id,
		};
		setMessages(prevMessages => [...prevMessages, messageData]);
		socket.emit("send_message", messageData);
		setMessage('')
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessages(prevMessages => [...prevMessages, data]);
		})

		return function off() {
			socket.removeListener("receive_message");
		};
	});

  return (
    <div className="chat">
		<main>
			{messages.map((msg, index) => (
				<div key={index} className={msg.socketId === socket.id ? 'from message' : 'to message'}>
				<p>{msg.message}</p>
				</div>
			))}
		</main>
		<form className="manage">
		<input
			placeholder="Type.."
			className='msg-input'
			value={message}
			onChange={(event) => {
			setMessage(event.target.value);
			}}
		/>
		<button className='sendBtn' onClick={sendMessage}>
			<svg height="35" id="Layer_21" viewBox="0 0 24 24" width="35" xmlns="http://www.w3.org/2000/svg">
				<polygon fill="white" points="3 12 8.61 14.992 17 8 9 17.455 9 21 12.164 16.887 18 20 21 3 3 12"/>
			</svg>
		</button>
		</form>

    </div>
  );
}
