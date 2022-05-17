import React, { useEffect, useState } from 'react';
import {
	Container,
	Grid,
	GridItem,
	Textarea,
	Heading,
	Box,
	Avatar,
	Center,
	Flex,
	Button,
	Text,
} from '@chakra-ui/react';
import chatService from '../services/chatServices';
import { useParams } from 'react-router-dom';
import { findAllByDisplayValue } from '@testing-library/react';
const { io } = require('socket.io-client');

const Chat = (props) => {
	const socket = io('http://localhost:5005');
	const { username } = props.userState;
	const { chatId } = useParams();
	const [isAllowed, setIsAllowed] = useState(false);
	const [messages, setMessages] = useState();
	const [text, setText] = useState('');

	const getChat = async () => {
		try {
			const chatInfo = await chatService.getChatInfo(
				props.userState._id,
				chatId
			);
			setIsAllowed(true);
			setMessages(chatInfo.data.messages);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getChat();
	}, []);

	useEffect(() => {
		if (socket && isAllowed) {
			socket.on('connect', () => {
				socket.emit('joinChat', { chatId, userId: props.userState._id });
			});
			socket.on('newMessage', (message) => {
				console.log(message);
				setMessages([...messages, message]);
			});
		}
	}, [isAllowed]);

	const sendMessage = (event) => {
		event.preventDefault();
		socket.emit('chatroomMessage', {
			chatId,
			text,
			userId: props.userState._id,
		});
		setText('');
	};

	const handleTextChange = (event) => {
		setText(event.target.value);
	};

	const messageList = messages ? (
		messages.map((message, index) => {
			return <Text key={chatId + index}>{message.content}</Text>;
		})
	) : (
		<></>
	);

	return (
		<Container w="100vw" h="85vh">
			<Center w="100%" h="100%">
				<Box w="100%" h="100%">
					<Grid w="100%" h="100%" templateRows="repeat(9, 1fr)">
						<GridItem rowSpan={1}>
							<Flex h="100%" borderRadius="0.5rem">
								<Avatar />
								<Heading>{username}</Heading>
							</Flex>
						</GridItem>
						<GridItem rowSpan={6}>
							<Box h="100%" borderRadius="0.5rem" borderWidth="1px">
								{messageList}
							</Box>
						</GridItem>
						<GridItem rowSpan={2}>
							<form onSubmit={sendMessage}>
								<Textarea
									placeholder="Send a message"
									value={text}
									onChange={handleTextChange}
								/>
								<Button type="submit">Send Message</Button>
							</form>
						</GridItem>
					</Grid>
				</Box>
			</Center>
		</Container>
	);
};

export default Chat;
