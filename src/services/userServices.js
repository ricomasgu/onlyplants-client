import axios from 'axios';

class Service {
	constructor() {
		this.baseUrl = 'http://localhost:5005/api';
	}

	getFollowers = (userId) => {
		return axios.get(`${this.baseUrl}/user/${userId}/followers`);
	};

	getFollowing = (userId) => {
		return axios.get(`${this.baseUrl}/user/${userId}/following`);
	};

	followUser = (currentUser, userToFollow) => {
		return axios.post(`${this.baseUrl}/user/follow`, {
			currentUser,
			userToFollow,
		});
	};

	unFollowUser = (currentUser, userToUnfollow) => {
		return axios.post(`${this.baseUrl}/user/unfollow`, {
			currentUser,
			userToUnfollow,
		});
	};
}

const userService = new Service();
export default userService;
