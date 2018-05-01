import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }
  loginEmail(email: string, password: string) {
    return this.http.post('http://localhost:3000/login', {email, password});
  }
  createUser(data: object) {
    return this.http.post('http://localhost:3000/signup', data);
  }
  logoutUser(data) {
    return this.http.post('http://localhost:3000/logout', data);
  }
}
