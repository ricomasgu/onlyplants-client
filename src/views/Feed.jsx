import { Container } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import Post from '../components/Post';

const Feed = () => {
	const post = {
		picture:
			'https://media.istockphoto.com/photos/potted-snake-plants-inside-a-beautiful-new-flat-or-apartment-picture-id1268045137?k=20&m=1268045137&s=612x612&w=0&h=vXDA2fYCp1dnUhGM7bCbGxmvjZJtrGomlQtiJVEXdAE=',
		description:
			'Lorem ipsum dolor sit amet. Est iure quae in expedita molestias et amet aperiam ut fuga molestias aut voluptas tempore At repellendus autem aut cumque consequatur. ',
		comments: ['Super Cool', '😍'],
	};

	return (
		<div>
			<Navbar />
			<Container>
				<Post post={post} />
				<Post post={post} />
				<Post post={post} />
				<Post post={post} />
				<Post post={post} />
				<Post post={post} />
				<Post post={post} />
			</Container>
		</div>
	);
};

export default Feed;
