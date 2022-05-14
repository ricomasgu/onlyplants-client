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
	useColorMode,
	Switch,
	FormLabel,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import service from '../services/service';

const Navbar = (props) => {
	const { username, avatar } = props.userState;
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate();

	const color = useColorModeValue('black', 'gray.800');

	const handleLogout = async () => {
		try {
			await service.logout();

			props.setUserState('');
			props.setLoggedIn(false);

			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="navbar">
			<nav>
				<Flex alignItems="center" color={color}>
					<Spacer />
					<HStack spacing="24px">
						<Box p="2">
							<Center gap="2">
								<Avatar
									src="https://upload.wikimedia.org/wikipedia/commons/3/35/Berry_plant_illustration.png"
									size="sm"
								/>
								<Heading size="md">OnlyPlants</Heading>
							</Center>
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
									<FormLabel htmlFor="toggle-mode" mb="0">
										<Text fontSize="12px">
											Mode: {colorMode === 'light' ? 'Light' : 'Dark'}
										</Text>
									</FormLabel>
									<Switch onChange={toggleColorMode}></Switch>
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
