import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {Message} from '../../shared/models/message.model';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  NA: string = 'ar.naranov@gmail.com';
  pass: string = '123456';

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
    this.userService.getUserByEmail(formData.email, formData.password)
      .subscribe((data: object) => {
        console.log(data);
        if (data) {
          if (data['statusCode'] === 200) {
            this.authService.login();
            this.router.navigate(['/system']);
          } else {
            this.showMessage({
              type: 'danger',
              text: 'error'
            });
          }
        } else {
          this.showMessage({
            type: 'danger',
            text: 'error'
          });
        }
      });
  }

}
