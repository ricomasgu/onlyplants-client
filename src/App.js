import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import HomePlaceholder from './views/HomePlaceholder';
import Login from './components/Login';

function App() {

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePlaceholder />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/post" element={<AddPost />} />
				<Route path="/post/postdetail" element={<PostDetail />} />
			</Routes>
		</div>
	);
}

export default App;
