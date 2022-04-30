import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import SignUp from './components/SignUp';
import AddPost from './views/AddPost';
import PostDetail from './views/PostDetail';
import HomePlaceholder from './views/HomePlaceholder';
import Feed from './views/Feed';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePlaceholder />} />
				<Route path="/feed" element={<Feed />} />
				<Route path="/post" element={<AddPost />} />
				<Route path="/post/postdetail" element={<PostDetail />} />
			</Routes>

			{/* <SignUp /> */}
		</div>
	);
}

export default App;
