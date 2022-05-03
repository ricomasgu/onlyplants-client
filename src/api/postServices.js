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

	uploader = (file) => {
		return axios.post(`${this.baseUrl}/fileUpload`, file, {
			withCredentials: true,
		});
	};
}

const postService = new Service();
export default postService;
