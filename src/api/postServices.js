import axios from 'axios';

class Service {
	constructor() {
		this.baseUrl = 'http://localhost:5005/api';
	}

	createPost = (imageUrl, plantType, description, creator) => {
		return axios.post(
			`${this.baseUrl}/post`,
			{
				imageUrl,
				plantType,
				description,
				creator,
			},
			{
				withCredentials: true,
			}
		);
	};

	getPost = (postId) => {
		return axios.get(`${this.baseUrl}/post/${postId}`);
	};

	deletePost = (postId) => {
		return axios.delete(`${this.baseUrl}/post/${postId}`);
	};

	addComment = (comment, owner, post) => {
		return axios.post(
			`${this.baseUrl}/comment`,
			{ comment, owner, post },
			{
				withCredentials: true,
			}
		);
	};

	deleteComment = (commentId, postId) => {
		return axios.post(`${this.baseUrl}/comment/delete`, { commentId, postId });
	};

	likePost = (postId, userId) => {
		return axios.post(
			`${this.baseUrl}/post/like`,
			{ postId, userId },
			{
				withCredentials: true,
			}
		);
	};

	dislikePost = (postId, userId) => {
		return axios.post(
			`${this.baseUrl}/post/dislike`,
			{ postId, userId },
			{
				withCredentials: true,
			}
		);
	};

	uploader = (file) => {
		return axios.post(`${this.baseUrl}/fileUpload`, file, {
			withCredentials: true,
		});
	};

	getFeed = (userId, limit) => {
		return axios.post(`${this.baseUrl}/feed`, { userId, limit });
	};

	getExplore = () => {
		return axios.get(`${this.baseUrl}/explore`);
	};

	getSearchPost = (searchValue) => {
		return axios.post(`${this.baseUrl}/explore/postSearch`, { searchValue });
	};

	getSearchUser = (searchValue) => {
		return axios.post(`${this.baseUrl}/explore/userSearch`, { searchValue });
	};

	getUser = (userId) => {
		return axios.post(`${this.baseUrl}/user /${userId}`);
	};
}

const postService = new Service();
export default postService;
