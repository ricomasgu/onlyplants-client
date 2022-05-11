import {
	Avatar,
	Container,
	Text,
	Center,
	Spacer,
	Flex,
	Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

const UserCard = (props) => {
	const { user } = props;
	return (
		<Container
			border="1px"
			borderColor="gray.200"
			borderRadius="25px"
			p="25px"
			boxShadow="base"
		>
			<Flex align="center" gap="2">
				<Link to={`/user/${user._id}`}>
					<Center gap="5">
						<Avatar src={user.avatar} size="lg" />
						<Text fontSize="30px">{user.username}</Text>
					</Center>
				</Link>
				<Spacer />

				<Button size="md" colorScheme="facebook">
					<Text>Follow</Text>
				</Button>
			</Flex>
			<Flex align="center" gap="6" mt="15px">
				<Spacer />
				<Link to={`/user/${user._id}/`}>
					{user.posts ? (
						<Text>{user.posts.length} Posts</Text>
					) : (
						<Text>0 Posts</Text>
					)}
				</Link>
				<Link to={`/user/${user._id}/followers`}>
					{user.followers ? (
						<Text>{user.followers.length} Followers</Text>
					) : (
						<Text>0 Followers</Text>
					)}
				</Link>
				<Link to={`/user/${user._id}/following`}>
					{user.following ? (
						<Text>{user.following.length} Following</Text>
					) : (
						<Text>0 Following</Text>
					)}
				</Link>
				<Spacer />
			</Flex>
		</Container>
	);
};

export default UserCard;
