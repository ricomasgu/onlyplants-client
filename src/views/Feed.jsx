import { Container } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
// import Post from '../components/Post';

const Feed = (props) => {
	return (
		<div>
			<Navbar {...props} />
			<Container></Container>
		</div>
	);
};

export default Feed;
