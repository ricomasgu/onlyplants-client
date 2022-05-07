import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Post from '../components/Post';

const PostDetail = (props) => {
	const { postId } = useParams();
	return (
		<div>
			<Navbar {...props.userState} />
			<div>
				<div>
					<Post postId={postId} {...props} extended />
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
