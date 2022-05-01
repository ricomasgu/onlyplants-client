import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import HomePlaceholder from './views/HomePlaceholder';
import Login from './components/Login';
import Feed from './views/Feed';

function App() {
	const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

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
	};

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePlaceholder  />} />
				<Route path="/signup" element={<SignUp setUserState={ setUserState } />} />
				<Route path="/login" element={<Login setUserState={ setUserState } />} />
				<Route path="/feed" element={<Feed { ...userAppState } />} />
				<Route path="/post" element={<AddPost />} />
				<Route path="/post/postdetail" element={<PostDetail />} />
			</Routes>
		</div>
	);
}

export default App;
