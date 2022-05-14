import axios from 'axios';

class Service {
  constructor (){
    this.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5005/api';
  }

  signup( userInput ) {
    return axios.post(
      `${ this.baseURL }/auth/signup`, 
      userInput,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      }
    );
  }

  login( userInput ) {
    return axios.post(
      `${ this.baseURL }/auth/login`, 
      userInput,
      {
        withCredentials: true
      }
    );
  }

  loggedIn() {
    return axios.get(
      `${ this.baseURL }/auth/loggedIn`,
      {
        withCredentials: true
      }
    );
  }

  logout() {
    return axios.delete(
      `${ this.baseURL }/auth/logout`,
      {
        withCredentials: true
      }
    );
  }

}

const authService = new Service();
export default authService;