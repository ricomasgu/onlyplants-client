import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Loading from './components/Loading';

import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import Feed from './views/Feed';
import Explore from './views/Explore';
import UserDetails from './views/UserDetails';
import Followers from './views/Followers';
import Following from './views/Following';
import ChatList from './views/ChatList';
import Chat from './views/Chat';

import authService from './services/authServices';

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
				<Loading />
			) : (
				<>
					{loggedIn ? (
						<Navbar
							userState={userState}
							setUserState={setUserState}
							setLoggedIn={setLoggedIn}
						/>
					) : (
						<></>
					)}
					<Routes>
						<Route
							index
							element={
								loggedIn ? (
									<Navigate to="/feed" replace />
								) : (
									<Navigate to="/signup" replace />
								)
							}
						/>

						<Route
							element={
								<ProtectedRoutes loggedIn={loggedIn} redirection={'/feed'} />
							}
						>
							<Route
								path="/signup"
								element={
									<SignUp
										setUserState={setUserState}
										setLoggedIn={setLoggedIn}
									/>
								}
							/>

							<Route
								path="/login"
								element={
									<Login
										setUserState={setUserState}
										setLoggedIn={setLoggedIn}
									/>
								}
							/>
						</Route>

						<Route
							element={
								<ProtectedRoutes loggedIn={!loggedIn} redirection={'/signup'} />
							}
						>
							<Route path="/feed" element={<Feed userState={userState} />} />

							<Route
								path="/explore"
								element={<Explore userState={userState} />}
							/>

							<Route
								path="/post"
								element={
									<AddPost userState={userState} setUserState={setUserState} />
								}
							/>

							<Route
								path="/post/:postId"
								element={<PostDetail userState={userState} />}
							/>

							<Route
								path="/profile"
								element={
									<UserProfile
										userInfo={userState}
										userState={userState}
										itIsMe={true}
									/>
								}
							/>

							<Route
								path="/profile/settings"
								element={
									<UserProfile
										userInfo={userState}
										userState={userState}
										setUserState={setUserState}
									/>
								}
							/>

							<Route
								path="/user/:userId"
								element={
									<UserDetails
										userState={userState}
										setUserState={setUserState}
									/>
								}
							/>

							<Route
								path="/user/:userId/followers"
								element={<Followers userState={userState} />}
							/>

							<Route
								path="/user/:userId/following"
								element={<Following userState={userState} />}
							/>

							<Route
								path="/chats"
								element={<ChatList userState={userState} />}
							/>

							<Route
								path="/chats/:chatId"
								element={<Chat userState={userState} />}
							/>
						</Route>

						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
