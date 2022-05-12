import { Container } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import userServices from '../services/userServices';

const Followers = (props) => {
	const { userId } = useParams();
	const [followers, setFollowers] = React.useState([]);

	React.useEffect(() => {
		async function getFollowers(userId) {
			try {
				const responseFromApi = await userServices.getFollowers(userId);
				setFollowers(responseFromApi.data);
			} catch (error) {
				console.log(error);
			}
		}
		getFollowers(userId);
	}, [userId]);

	const listOfFollowers = followers ? (
		followers.map((follow) => (
			<Container mt="25px" mb="25px" key={follow._id}>
				<UserCard foundUser={follow} userState={props.userState} />
			</Container>
		))
	) : (
		<></>
	);

	return (
		<div>
			<>{listOfFollowers}</>
		</div>
	);
};

export default Followers;
