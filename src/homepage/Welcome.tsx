import { useNavigate } from 'react-router-dom';
import './Welcome.css'
import { useState } from 'react';

export default function Welcome() {
	const [roomId, setRoomId] = useState('')
	const navigate = useNavigate();

	const createRoom = () => {
		const newRoomId = Math.floor(Math.random() * 1000)

		navigate(`/room/${newRoomId}`);
	}

	const joinRoom = () => {
		if(roomId  === '') return
		navigate(`/room/${roomId}`);
	}

	return (
		<div className="welcome">
		<h1 className="title">BlinkChat</h1>
				<button className="createBtn" onClick={createRoom}>Create a room</button>
				<div className="join">
					<input type="number" placeholder='Room No..' className="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
					<button className='roomBtn' onClick={joinRoom}>Join</button>
				</div>

		</div>
	)
}