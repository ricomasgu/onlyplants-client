import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import HomePlaceholder from './views/HomePlaceholder';

function App() {
	const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

	const userInfo = {
		firstName: [firstName, setFirstName],
		lastName: [lastName, setLastName],
		email: [email, setEmail],
		username: [username, setUsername],
		password: [password, setPassword],
		avatar: [avatar, setAvatar]
	}

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePlaceholder { ...userInfo } />} />
				<Route path="/signup" element={<SignUp { ...userInfo } />} />
				<Route path="/post" element={<AddPost />} />
				<Route path="/post/postdetail" element={<PostDetail />} />
			</Routes>
		</div>
	);
}

export default App;
