import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {UserInfoService} from '../shared/services/user-info.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {

  userData = [];

  constructor(private route: ActivatedRoute,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((param: Params) => {
        this.userInfoService.getUserInfo(param.id)
          .subscribe((data: any) => {
            this.userData.push(data['user']);
          });
      })
  }
}
