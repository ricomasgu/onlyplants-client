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

const Post = (props) => {
	const { post, extended } = props;
	const commentList = post.comments.map((comment) => (
		<Stack direction="row" align="center" m="5px">
			<Avatar src="" size="xs" />
			<Text fontSize="xs" fontWeight="bold">
				Username
			</Text>
			<Text fontSize="xs">{comment}</Text>
		</Stack>
	));
	const handleLike = () => {};
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
				<Container h="400px">
					<Center>
						<Image src={post.picture} />
					</Center>
				</Container>
				<Container>
					<Flex align="center" gap="2">
						<Avatar src="" size="sm" />
						<Text>Username</Text>
						<Spacer />
						<Text>Plant Type</Text>
						<Spacer />
						<Button variant="outline" colorScheme="green" onClick={handleLike}>
							<Center>10 Likes 💚</Center>
						</Button>
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
