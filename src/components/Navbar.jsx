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

const Navbar = ( props ) => {
	const {
		firstName: [ firstName, ],
		lastName: [ lastName, ],
		username: [ username, ],
		avatar: [ avatar, ],
	} = props;

	const handleLogout = () => {
		console.log('Clicked');
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
							<Avatar 
								src={ avatar !== '' ? URL.createObjectURL( avatar ) : avatar }
        				name={ firstName === '' || lastName === '' ? null :  `${firstName} ${lastName}` } 
								size="sm"
							/>
							<Wrap>
								<Center gap="4">
									<Link to="/profile">{ username }'s Profile</Link>
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
