import React from 'react';
import {
	Button,
	Center,
	Container,
	Textarea,
	useColorModeValue,
} from '@chakra-ui/react';

import postService from '../services/postServices';

const Comment = (props) => {
	const { userState, post, setPost } = props;
	const [comment, setComment] = React.useState('');

	const bg = useColorModeValue('white', 'gray.200');
	const color = useColorModeValue('black', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.400');

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	const handleCommentCancel = (event) => {
		event.preventDefault();
		setComment('');
	};

	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		const createdComment = await postService.addComment(
			comment,
			userState._id,
			post._id
		);
		if (createdComment.status === 200) {
			setComment('');
			setPost({
				...post,
				comments: [
					...post.comments,
					{
						_id: createdComment.data._id,
						comment,
						owner: userState,
						post: post._id,
					},
				],
			});
		}
	};
	return (
		<div>
			<Container mt="25px" mb="25px" color={color}>
				<form onSubmit={handleCommentSubmit}>
					<Textarea
						placeholder="Add a Comment"
						mb="25px"
						name="comment"
						value={comment}
						onChange={handleCommentChange}
						bg={bg}
						color={color}
						_placeholder={{ color: 'gray' }}
						borderColor={borderColor}
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
	);
};

export default Comment;
