import { Container, Button, Center } from '@chakra-ui/react';
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
			<></>
		);

	const handleLoad = () => {
		setLimit(limit + 10);
	};

	return (
		<div>
			<Container>{feedArray}</Container>
			<Container mt="50px" mb="50px">
				<Center>
					<Button onClick={handleLoad}>Load More</Button>
				</Center>
			</Container>
		</div>
	);
};

export default Feed;
