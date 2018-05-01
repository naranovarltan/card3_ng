import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: any;
  idUser: string;

  constructor(private route: ActivatedRoute,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((param: Params) => {
        this.userInfoService.getUserInfo(param.id)
          .subscribe((data: any) => {
            this.userData = data['user'];
            this.idUser = this.userData['_id'];
          });
      })
  }

  logOut() {

  }

}
