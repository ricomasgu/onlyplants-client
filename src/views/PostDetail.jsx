import React from 'react';
import { useParams } from 'react-router-dom';

import postService from '../api/postServices';

import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostDetail = (props) => {
	const { postdetail } = useParams();
	const [post, setPost] = React.useState({});

	React.useEffect(() => {
		async function fetch(postId) {
			const wantedPost = await postService.getPost(postId);
			setPost(wantedPost.data);
		}
		fetch(postdetail);
	}, [postdetail, post.liked, post.commented]);

	return (
		<div>
			<Navbar {...props} />
			<div>
				{post._id && (
					<div>
						<Post post={post} setPost={setPost} extended {...props} />
						<Comment post={post} setPost={setPost} {...props} />
					</div>
				)}
			</div>
		</div>
	);
};

export default PostDetail;
