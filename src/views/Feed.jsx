import { Container, Button, Center, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import postService from '../services/postServices';
import Post from '../components/Post';

const Feed = (props) => {
	const { userState } = props;
	const [feed, setFeed] = React.useState([]);
	const [limit, setLimit] = React.useState(10);

	React.useEffect(() => {
		async function fetchFeed(user) {
			const feedRes = await postService.getFeed(user, limit);
			setFeed(feedRes.data);
		}
		fetchFeed(userState._id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limit]);

	const feedArray =
		feed.length > 1 ? (
			feed.map((post) => (
				<Container key={post._id} mb="25px">
					<Post postId={post._id} userState={userState} feed />
				</Container>
			))
		) : (
			<Container align="center" mt="50px">
				<Text fontSize="25px">Oooops... Nothing to find here. </Text>
				<Text textColor="green">
					<Link to="/explore">Discover new beautiful things</Link>
				</Text>
			</Container>
		);

	const handleLoad = () => {
		setLimit(limit + 10);
	};

	return (
		<div>
			<Container>{feedArray}</Container>
			{feed.length > 1 && (
				<Container mt="50px" mb="50px">
					<Center>
						<Button onClick={handleLoad}>Load More</Button>
					</Center>
				</Container>
			)}
		</div>
	);
};

export default Feed;
