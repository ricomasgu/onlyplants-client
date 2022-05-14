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
import userServices from '../services/userServices';

const UserCard = (props) => {
	const { foundUser, userState } = props;
	const [isFollowed, setIsFollowed] = React.useState(false);
	const [user, setUser] = React.useState(foundUser);

	React.useEffect(() => {
		if (userState.following.includes(user._id)) {
			setIsFollowed(true);
		} else {
			setIsFollowed(false);
		}
	}, [user._id, userState.following]);

	const handleFollow = async () => {
		try {
			const resFromApi = await userServices.followUser(userState._id, user._id);
			if (resFromApi.status === 200) {
				setUser({ ...user, followers: [...user.followers, userState._id] });
				setIsFollowed(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleUnfollow = async () => {
		try {
			const resFromApi = await userServices.unFollowUser(
				userState._id,
				user._id
			);
			if (resFromApi.status === 200) {
				const updatedFollow = user.followers.filter(
					(like) => like !== userState._id
				);
				setUser({ ...user, followers: updatedFollow });
				setIsFollowed(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
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
				{isFollowed ? (
					<Button size="md" colorScheme="facebook" onClick={handleUnfollow}>
						<Text>Unfollow</Text>
					</Button>
				) : (
					<Button
						size="md"
						colorScheme="facebook"
						variant="outline"
						onClick={handleFollow}
					>
						<Text>Follow</Text>
					</Button>
				)}
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
