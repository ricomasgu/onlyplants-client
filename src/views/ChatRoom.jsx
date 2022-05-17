import React from 'react';
const { io } = require('socket.io-client');

const ChatRoom = () => {
	const socket = io('http://localhost:5005');

	React.useEffect(() => {
		socket.on('connect', () => {
			console.log(socket.id);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<></>
		</div>
	);
};

export default ChatRoom;
