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
import { Link, useNavigate } from 'react-router-dom';
import service from '../services/service';

const Navbar = (props) => {
	const { username, avatar } = props;

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const resFromApi = await service.logout();
			if (resFromApi) {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="navbar">
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
							<Avatar src={avatar} size="sm" />
							<Wrap>
								<Center gap="4">
									<Link to="/profile">{username}</Link>
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
