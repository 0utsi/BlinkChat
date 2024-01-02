import { useEffect, useRef } from "react";
import './Chat.css'

export default function ChatMessages({messages, socket, nick}) {
	const scrollRef = useRef<HTMLElement>(null);

	useEffect(() => {

		if (scrollRef.current) scrollRef.current.scrollIntoView();

	}, [messages]);

	return (
		<main>
			{messages.map((msg, index) => (
				<div key={index} className={msg.socketId === socket?.id ? 'from message' : 'to message'}>
					<p id="nickname">{nick}</p>
					<p>{msg.message}</p>
				</div>
			))}
			<div ref={scrollRef} />
		</main>
	)
}