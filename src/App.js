import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import Login from './components/Login';
import Feed from './views/Feed';
import ProtectedRoutes from './components/ProtectedRoutes';

import service from './services/service';
import { Spinner } from '@chakra-ui/react';

function App() {
	const [userState, setUserState] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const userLoggedIn = async () => {
		setLoading(false);
		try {
			const resFromApi = await service.loggedIn();
			setUserState(resFromApi.data);
			if (typeof resFromApi.data === 'object') {
				setLoggedIn(true);
			}
		} catch (error) {
			console.log(error);
		}
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
				<Routes>
					<Route
						path='/'
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
							) : (
								<Navigate to="/feed" />
							)
						}
					/>
					<Route
						path="/feed"
						element={
							loggedIn ? (
								<Feed userState={userState} />
							) : (
								<Navigate to="/signup" />
							)
						}
					/>
					<Route
						path="/post"
						element={
							loggedIn ? <AddPost {...userState} /> : <Navigate to="/signup" />
						}
					/>
					<Route
						path="/post/:postId"
						element={
							loggedIn ? (
								<PostDetail userState={userState} />
							}
						/>
					</Route>
				</Routes>
			)}
		</div>
	);
}

export default App;
