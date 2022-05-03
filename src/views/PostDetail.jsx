import React from 'react';
import { Button, Center, Container, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import postService from '../api/postServices';

import Navbar from '../components/Navbar';
import Post from '../components/Post';

const PostDetail = (props) => {
	const postId = useParams();
	const [post, setPost] = React.useState({});
	const [comment, setComment] = React.useState('');

	React.useEffect(() => {
		async function fetch(postId) {
			const wantedPost = await postService.getPost(postId);
			setPost(wantedPost.data);
			console.log(post);
		}
		fetch(postId);
	}, [postId, post]);

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	const handleCommentCancel = (event) => {
		event.preventDefault();
		setComment('');
	};

	const handleCommentSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div>
			<Navbar {...props} />
			<div>
				<div>{post && <Post post={post} extended />}</div>
				<div>
					<Container mt="25px" mb="25px">
						<form onSubmit={handleCommentSubmit}>
							<Textarea
								placeholder="Add a Comment"
								mb="25px"
								name="comment"
								value={comment}
								onChange={handleCommentChange}
							></Textarea>
							<Center gap="4">
								<Button variant="outline" colorScheme="green" type="submit">
									Comment
								</Button>
								<Button
									variant="outline"
									colorScheme="red"
									onClick={handleCommentCancel}
								>
									Cancel
								</Button>
							</Center>
						</form>
					</Container>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
