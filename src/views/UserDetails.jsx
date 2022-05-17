import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import userService from '../services/userServices';
import Loading from '../components/Loading';
import UserProfile from '../components/UserProfile';

const UserDetails = (props) => {
	const { userId } = useParams();

	const [userInfo, setUserInfo] = useState();
	const [loading, setLoading] = useState(true);

	const getUserInfo = async () => {
		try {
			const user = await userService.getUser(userId);
			setUserInfo(user.data);
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
				<UserProfile userInfo={userInfo} itIsMe={false} {...props}/>
			)}
		</>
	);
};

export default UserDetails;
