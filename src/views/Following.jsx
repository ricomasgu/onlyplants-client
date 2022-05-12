import { Container } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import userServices from '../services/userServices';

const Following = (props) => {
	const { userId } = useParams();
	const [following, setFollowing] = React.useState([]);

	React.useEffect(() => {
		async function getFollowing(userId) {
			try {
				const responseFromApi = await userServices.getFollowing(userId);
				setFollowing(responseFromApi.data);
			} catch (error) {
				console.log(error);
			}
		}
		getFollowing(userId);
	}, [userId]);

	const listOfFollowing = following ? (
		following.map((follow) => (
			<Container mt="25px" mb="25px" key={follow._id}>
				<UserCard foundUser={follow} userState={props.userState} />
			</Container>
		))
	) : (
		<></>
	);

	return (
		<div>
			<>{listOfFollowing}</>
		</div>
	);
};

export default Following;
