import React from 'react';
import { Button, Center, Container, Textarea } from '@chakra-ui/react';

import postService from '../api/postServices';

const Comment = (props) => {
	const { _id, postdetail } = props;
	const [comment, setComment] = React.useState('');

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
			_id,
			postdetail
		);
		if (createdComment) {
			setComment('');
		}
	};
	return (
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
	);
};

export default Comment;
