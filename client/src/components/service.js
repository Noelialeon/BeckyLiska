import axios from 'axios';

class Service {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    });
    this.service = service;
  }

  isLoggedIn = () => {
    return this.service.get('/api/loggedin')
      .then(response => response.data)
      .catch(err => console.log(err))
  }
  logout = () => {
    return this.service.get('/api/logout')
      .then(response => response.data)
      .catch(err => console.log(err))
  }
  // getCollections = () => {
  //   return this.service.get('/collections/user/collections')
  //     .then(response => response.data)
  //     .catch(err => console.log(err))
  // }
}

export default Service;
