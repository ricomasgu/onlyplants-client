import React from 'react';
import { Button, Center, Container, Textarea } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import Post from '../components/Post';

const PostDetail = () => {
	const post = {
		picture:
			'https://media.istockphoto.com/photos/potted-snake-plants-inside-a-beautiful-new-flat-or-apartment-picture-id1268045137?k=20&m=1268045137&s=612x612&w=0&h=vXDA2fYCp1dnUhGM7bCbGxmvjZJtrGomlQtiJVEXdAE=',
		description:
			'Lorem ipsum dolor sit amet. Est iure quae in expedita molestias et amet aperiam ut fuga molestias aut voluptas tempore At repellendus autem aut cumque consequatur. ',
		comments: ['Super Cool', '😍'],
	};

	const [comment, setComment] = React.useState('');

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
			<Navbar />
			<div>
				<div>
					<Post post={post} extended />
				</div>
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
