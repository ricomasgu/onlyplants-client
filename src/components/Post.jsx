import React from 'react';

import {
	Center,
	Container,
	Image,
	Flex,
	Avatar,
	Text,
	Spacer,
	Button,
	Stack,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import postService from '../api/postServices';

const Post = (props) => {
	const { post, extended, isAdmin, _id, reload, setReload } = props;
	const navigate = useNavigate();
	const [liked, setLiked] = React.useState(false);

	React.useEffect(() => {
		if (post.likes.includes(_id)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [post.likes, _id, liked, reload]);

	const handleDeleteComment = async (event) => {
		const commentId = event.target.id;
		const deletedComment = await postService.deleteComment(commentId, post._id);
		if (deletedComment.status === 200) {
			setReload(!reload);
		}
	};

	const commentList = post.comments.map((comment) => (
		<div key={comment._id}>
			<Stack direction="row" align="center" m="5px">
				<Avatar src={comment.owner.avatar} size="xs" />
				<Text fontSize="xs" fontWeight="bold">
					{comment.owner.username}
				</Text>

				<Text fontSize="xs">{comment.comment}</Text>
				<Spacer />
				{comment.owner._id === _id && (
					<Button
						size="xs"
						fontSize="12px"
						colorScheme="red"
						borderRadius="25px"
						id={comment._id}
						onClick={handleDeleteComment}
					>
						X
					</Button>
				)}
			</Stack>
		</div>
	));
	const handleLike = async () => {
		const likedPost = await postService.likePost(post._id, _id);
		if (likedPost.status === 200) {
			setReload(!reload);
		}
	};
	const handleDislike = async () => {
		const dislikedPost = await postService.dislikePost(post._id, _id);
		if (dislikedPost.status === 200) {
			setReload(!reload);
		}
	};
	const handleDelete = async () => {
		const deletedPost = await postService.deletePost(post._id);
		if (deletedPost) {
			navigate('/feed');
		}
	};
	return (
		<div>
			<Container
				border=".1px"
				borderColor="green"
				borderRadius="10px"
				pt="25px"
				pb="25px"
				boxShadow="xl"
			>
				{isAdmin && (
					<Flex justify="right" gap="2">
						<Button
							colorScheme="red"
							size="sm"
							borderRadius="100%"
							onClick={handleDelete}
						>
							X
						</Button>
					</Flex>
				)}
				<Container h="400px">
					<Center>
						<Image src={post.imageUrl} maxH="400px" maxW="400px" />
					</Center>
				</Container>
				<Container>
					<Flex align="center" gap="2" pt="25px">
						<Link to={`/user/${post.creator._id}`}>
							<Center gap="2">
								<Avatar src={post.creator.avatar} size="sm" />
								<Text>{post.creator.username}</Text>
							</Center>
						</Link>
						<Spacer />
						<Text>{post.plantType}</Text>
						<Spacer />
						{!liked && (
							<Button
								variant="outline"
								colorScheme="green"
								onClick={handleLike}
							>
								<Center>{post.likes.length} Likes 💚</Center>
							</Button>
						)}
						{liked && (
							<Button colorScheme="green" onClick={handleDislike}>
								<Center>{post.likes.length} Likes 💚</Center>
							</Button>
						)}
					</Flex>
				</Container>
				{extended && (
					<Container pt="25px">
						<Text fontSize="sm">{post.description}</Text>
					</Container>
				)}
				{extended && <Container pt="25px">{commentList}</Container>}
			</Container>
		</div>
	);
};

export default Post;
