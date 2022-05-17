import axios from 'axios';

class Service {
	constructor() {
		this.baseUrl = 'http://localhost:5005/api';
	}

	createChat = (participantIds) => {
		return axios.post(`${this.baseUrl}/createChat`, participantIds);
	};

  getUserChats = (userId) => {
		return axios.get(`${this.baseUrl}/getChats`, userId);
  };

	getChatInfo = (chatId) => {
		return axios.get(`${this.baseUrl}/getChat`, chatId);
	};
}

const chatService = new Service();
export default chatService;
