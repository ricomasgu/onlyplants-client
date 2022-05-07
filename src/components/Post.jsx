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
import Comment from '../components/Comment';

const Post = (props) => {
	const { postId, userState, extended, feed } = props;
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [liked, setLiked] = React.useState(false);
	const [post, setPost] = React.useState({});

	React.useEffect(() => {
		async function fetch(postId) {
			const wantedPost = await postService.getPost(postId);
			setPost(wantedPost.data);
			if (wantedPost.data.likes.includes(userState._id)) {
				setLiked(true);
			} else {
				setLiked(false);
			}
			if (userState._id === wantedPost.data.creator._id && !feed) {
				setIsAdmin(true);
			}
		}
		fetch(postId);
	}, [feed, postId, userState._id]);

	const handleLike = async () => {
		const likedPost = await postService.likePost(post._id, userState._id);
		if (likedPost.status === 200) {
			setPost({ ...post, likes: [...post.likes, userState._id] });
			setLiked(true);
		}
	};

	const handleDislike = async () => {
		const dislikedPost = await postService.dislikePost(post._id, userState._id);
		if (dislikedPost.status === 200) {
			const updatedLikes = post.likes.filter((like) => like !== userState._id);
			setPost({ ...post, likes: updatedLikes });
			setLiked(false);
		}
	};

	const handleDelete = async () => {
		const deletedPost = await postService.deletePost(post._id);
		if (deletedPost) {
			navigate('/feed');
		}
	};

	const handleDeleteComment = async (event) => {
		const commentId = event.target.id;
		const deletedComment = await postService.deleteComment(commentId, post._id);
		if (deletedComment.status === 200) {
			const updatedComment = post.comments.filter(
				(comment) => comment._id !== commentId
			);
			setPost({ ...post, comments: updatedComment });
		}
	};

	const commentList = post._id ? (
		post.comments.map((comment) => (
			<div key={comment._id}>
				<Stack direction="row" align="center" m="5px">
					<Avatar src={comment.owner.avatar} size="xs" />
					<Text fontSize="xs" fontWeight="bold">
						{comment.owner.username}
					</Text>
					<Text fontSize="xs">{comment.comment}</Text>
					<Spacer />
					{comment.owner._id === userState._id && (
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
		))
	) : (
		<></>
	);

	return (
		<div>
			{post._id && (
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
						<Link to={`/post/${post._id}`}>
							<Center>
								<Image src={post.imageUrl} maxH="400px" maxW="400px" />
							</Center>
						</Link>
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
					{extended && <Comment post={post} setPost={setPost} {...props} />}
				</Container>
			)}
		</div>
	);
};

export default Post;
