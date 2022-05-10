import React from 'react';
import { Container, Center, Button, Input } from '@chakra-ui/react';
import postService from '../api/postServices';

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

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Container mt="25px">
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
		</div>
	);
};

export default Explore;
