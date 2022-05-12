import React from 'react';
import { Center, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
	const { post } = props;
	return (
		<Center>
			<Link to={`/post/${post._id}`}>
				<Image
					src={post.imageUrl}
					boxSize="200px"
					borderRadius="25px"
					boxShadow="base"
				/>
			</Link>
		</Center>
	);
};

export default PostCard;
