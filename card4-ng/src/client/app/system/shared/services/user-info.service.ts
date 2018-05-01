import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserInfoService {
  constructor(private http: HttpClient) {
  }
  getUserInfo (id) {
    return this.http.get(`http://localhost:3000/system/user/${id}`);
  }
  logoutUser (data) {
    return this.http.post('http://localhost:3000/logout', data)
  }
}
