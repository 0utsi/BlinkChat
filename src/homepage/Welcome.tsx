import './Welcome.css'

export default function Welcome() {

	return (
		<div className="welcome">
		<h1 className="title">BlinkChat</h1>
				<button className="createBtn">Create a room</button>
				<div className="join">
					<input type="number" placeholder='Room ID..' className="roomId" />
					<button className='roomBtn'>Join</button>
				</div>
		</div>
	)
}