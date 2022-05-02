import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import Login from './components/Login';
import Feed from './views/Feed';

import service from './services/service';
import { Spinner } from '@chakra-ui/react';

function App() {
	const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const userAppState = {
		firstName,
		lastName,
		email,
		username,
		password,
		avatar
	}

	const setUserState = ( userState ) => {
		const {
			firstName: firstNameAppState,
			lastName: lastNameAppState,
			email: emailAppState,
			username: usernameAppState,
			password: passwordAppState,
			avatar: avatarAppState
		} = userState;

		setFirstName(firstNameAppState);
		setLastName(lastNameAppState);
		setEmail(emailAppState);
		setUsername(usernameAppState);
		setPassword(passwordAppState);
		setAvatar(avatarAppState);
		setLoggedIn(true);
	};

	const userLoggedIn = async () => {
		try {
			const resFromApi = await service.loggedIn();
			if (resFromApi.data !== '' ) {
				console.log(resFromApi.data);
				setUserState( resFromApi.data );
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}
	
	userLoggedIn();

	return (
		<div className="App">
			{	
				loading ? 
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='red.500'
					size='xl'
				/>
					:
				<Routes>
					<Route
						path="/"
						element=
						{
							loggedIn ? 
							<Navigate	to="/feed" /> 
							: 
							<Navigate to="/signup" /> 
						}
					/>
					<Route 
						path="/signup"
						element=
						{ 
							!loggedIn ? 
							<SignUp setUserState={ setUserState } /> 
							: 
							<Navigate to="/feed" /> 
						}
					/>
					<Route 
						path="/login" 
						element=
						{ 
							!loggedIn ? 
							<Login setUserState={ setUserState } /> 
							: 
							<Navigate to="/feed" /> 
						}
					/>
					<Route 
						path="/feed" 
						element=
						{ 
							loggedIn ? 
							<Feed { ...userAppState } /> 
							: 
							<Navigate to="/signup" /> 
						} 
					/>
					<Route 
						path="/post" 
						element=
						{
							loggedIn ? 
							<AddPost /> 
							: 
							<Navigate to="/signup" />
						} 
					/>
					<Route 
						path="/post/postdetail" 
						element=
						{ 
							loggedIn ? 
							<PostDetail /> 
							: 
							<Navigate to="/signup" /> 
						} 
					/>
				</Routes>
			}
		</div>
	);
}

export default App;
