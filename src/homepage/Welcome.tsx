import { useNavigate } from 'react-router-dom';
import './Welcome.css'

export default function Welcome() {
	const navigate = useNavigate();

	const createRoom = () => {
		const newRoomId = Math.floor(Math.random() * 1000)

		navigate(`/room/${newRoomId}`);
	}


	return (
		<div className="welcome">
		<h1 className="title">BlinkChat</h1>
				<button className="createBtn" onClick={createRoom}>Create a room</button>


		</div>
	)
}