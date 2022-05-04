import React from 'react';
import { Button, Center, Container, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import postService from '../api/postServices';

import Navbar from '../components/Navbar';
import Post from '../components/Post';

const PostDetail = (props) => {
	const { _id } = props;
	const { postdetail } = useParams();
	const [post, setPost] = React.useState({});
	const [comment, setComment] = React.useState('');
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [reload, setReload] = React.useState(false);

	React.useEffect(() => {
		async function fetch(postId) {
			const wantedPost = await postService.getPost(postId);
			setPost(wantedPost.data);
			if (_id === wantedPost.data.creator._id) {
				setIsAdmin(true);
			}
		}
		fetch(postdetail);
	}, [postdetail, _id, reload]);

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
			setReload(!reload);
			setComment('');
		}
	};

	return (
		<div>
			<Navbar {...props} />
			<div>
				<div>
					{post._id && (
						<Post
							post={post}
							extended
							isAdmin={isAdmin}
							setReload={setReload}
							reload={reload}
							{...props}
						/>
					)}
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
