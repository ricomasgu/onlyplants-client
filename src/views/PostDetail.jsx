import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

const PostDetail = (props) => {
	const { postId } = useParams();
	return (
		<div>
			<Post postId={postId} {...props} extended />
		</div>
	);
};

export default PostDetail;
