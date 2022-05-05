import React from 'react';
import { useParams } from 'react-router-dom';

import postService from '../api/postServices';

import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostDetail = (props) => {
	const { _id } = props;
	const { postdetail } = useParams();
	const [post, setPost] = React.useState({});

	React.useEffect(() => {
		async function fetch(postId) {
			const wantedPost = await postService.getPost(postId);
			setPost(wantedPost.data);
		}
		fetch(postdetail);
	}, [postdetail, _id, post]);

	return (
		<div>
			<Navbar {...props} />
			<div>
				{post._id && (
					<div>
						<Post post={post} setPost={setPost} extended {...props} />
						<Comment postdetail={postdetail} {...props} />
					</div>
				)}
			</div>
		</div>
	);
};

export default PostDetail;
