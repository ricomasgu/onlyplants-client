import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import Login from './components/Login';
import Feed from './views/Feed';
import ProtectedRoutes from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';

import authService from './api/authServices';
import { Spinner } from '@chakra-ui/react';

function App() {
	const [userState, setUserState] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	//The order here is important.
	const userLoggedIn = async () => {
		try {
			const resFromApi = await authService.loggedIn();
			setUserState(resFromApi.data);
			if (typeof resFromApi.data === 'object') {
				setLoggedIn(true);
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		userLoggedIn();
	}, []);

	return (
		<div className="App">
			{loading ? (
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="red.500"
					size="xl"
				/>
			) : (
				<>
					{ loggedIn ? (
						<Navbar 
							userState={userState} 
							setUserState={setUserState} 
							setLoggedIn={setLoggedIn}
						/> 
					) : (<></>) }
					<Routes>
						<Route
							index
							element={
								loggedIn ? <Navigate to="/feed" replace /> : <Navigate to="/signup" replace />
							}
						/>
						
						<Route element={ <ProtectedRoutes loggedIn={ loggedIn } redirection={'/feed'} />} >
							<Route 
								path="/signup"
								element={
									<SignUp setUserState={setUserState} setLoggedIn={setLoggedIn} />
								}
							/>

							<Route
								path="/login"
								element={
									<Login setUserState={setUserState} setLoggedIn={setLoggedIn} />
								}
							/>
						</Route>

						<Route element={ <ProtectedRoutes loggedIn={ !loggedIn } redirection={'/signup'} />} >
							<Route
								path="/feed"
								element={
									<Feed userState={userState} />
								}
							/>

							<Route
								path="/post"
								element={
									<AddPost userState={userState} setUserState={setUserState} />
								}
							/>

							<Route
								path="/post/:postId"
								element={
									<PostDetail userState={userState} />
								}
							/>
	
							<Route
								path="/profile"
								element={
									<UserProfile userState={userState} />
								}
							/>
						</Route>

						<Route path='*' element={<Navigate to='/' replace/>} />

					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
