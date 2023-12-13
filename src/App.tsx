import ChatRoom from './chat/Chat'
import Welcome from './homepage/Welcome'
import {Routes, Route} from "react-router-dom";
function App() {

  return (
    <>
		<Routes>
				<Route path="/" element={<Welcome/>} />
				<Route path="/room/:roomId" element={<ChatRoom/>} />
		</Routes>
    </>
  )
}

export default App
