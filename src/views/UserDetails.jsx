import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import postService from '../services/postServices';
import Loading from '../components/Loading';
import UserProfile from '../components/UserProfile';

const UserDetails = () => {
	const userId = useParams();

	const [userInfo, setUserInfo] = useState();
	const [loading, setLoading] = useState(true);

	const getUserInfo = async () => {
		try {
			const user = await postService.getUser(userId);
			setUserInfo(user);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		getUserInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<UserProfile userInfo={userInfo} itIsMe={false} {...props} />
			)}
		</>
	);
};

export default UserDetails;
