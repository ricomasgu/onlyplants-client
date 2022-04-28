import React from 'react';
import {
	Flex,
	Spacer,
	Heading,
	Box,
	HStack,
	Wrap,
	Avatar,
	Center,
	Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const handleLogout = () => {
		console.log('Clicked');
	};
	return (
		<div>
			<nav>
				<Flex alignItems="center">
					<Spacer />
					<HStack spacing="24px">
						<Box p="2">
							<Heading size="md">OnlyPlants</Heading>
						</Box>
						<Box>
							<Link to="/feed">Feed</Link>
						</Box>
						<Box>
							<Link to="/explore">Explore</Link>
						</Box>
						<Box>
							<Link to="/post">Post</Link>
						</Box>
					</HStack>
					<Spacer />
					<Wrap>
						<Center gap="2">
							<Avatar src="" size="sm" />
							<Wrap>
								<Center gap="2">
									<Link to="/post">Profile</Link>
									<Button onClick={handleLogout} size="sm">
										Logout
									</Button>
								</Center>
							</Wrap>
						</Center>
					</Wrap>
					<Spacer />
				</Flex>
			</nav>
		</div>
	);
};

export default Navbar;
