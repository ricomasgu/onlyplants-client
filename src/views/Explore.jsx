import React from 'react';
import {
	Container,
	Center,
	Button,
	Input,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import postService from '../services/postServices';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';

const Explore = () => {
	const [posts, setPosts] = React.useState([]);
	const [users, setUsers] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		async function getExplore() {
			try {
				const resFromApi = await postService.getExplore();
				setPosts(resFromApi.data);
			} catch (error) {
				console.log(error);
			}
		}
		getExplore();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleInputChange = (event) => {
		setSearchValue(event.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const foundPosts = await postService.getSearchPost(searchValue);
			setPosts(foundPosts.data);
			const foundUsers = await postService.getSearchUser(searchValue);
			setUsers(foundUsers.data);
		} catch (error) {
			console.log(error);
		}
	};

	const postList =
		posts.length > 0 ? (
			posts.map((post) => (
				<GridItem key={post._id}>
					<PostCard post={post} />
				</GridItem>
			))
		) : (
			<></>
		);

	const userList =
		users.length > 0 ? (
			users.map((user) => (
				<div key={user._id}>
					<UserCard user={user} />
				</div>
			))
		) : (
			<></>
		);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Container mt="25px" mb="25px">
					<Center gap="2">
						<Input
							variant="filled"
							borderRadius="10"
							placeholder="Type something here"
							name="searchValue"
							value={searchValue}
							onChange={handleInputChange}
						></Input>
						<Button variant="outline" colorScheme="blue" type="submit">
							Search
						</Button>
					</Center>
				</Container>
			</form>
			<div>
				<Grid templateColumns="repeat(4, 1fr)" gap={4}>
					{postList}
				</Grid>
			</div>
			<div>{userList}</div>
		</div>
	);
};

export default Explore;
