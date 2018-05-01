import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {Message} from '../../shared/models/message.model';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  NA: string = 'ar.naranov@gmail.com';
  pass: string = '123456';

  user: User;

  form: FormGroup;
  message: Message;

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.loginEmail(formData.email, formData.password)
      .subscribe((data: object) => {
        this.user = data['user'];
        console.log(this.user);
        if (data) {
          if (data['statusCode'] === 200) {
            this.authService.login();
            this.router.navigate(['/system/user', data['user']._id]);
          } else {
            console.log('asd');
            this.showMessage({
              type: 'danger',
              text: 'error'
            });
          }
        } else {
          console.log('dsa');
          this.showMessage({
            type: 'danger',
            text: 'error'
          });
        }
      });
  }

}
