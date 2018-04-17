import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../shared/services/user.service';
import {Title} from '@angular/platform-browser';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private title: Title) {
    title.setTitle('SignUp');
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'firstname': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'lastname': new FormControl(null, [Validators.required, Validators.minLength(6)]),
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
    const {email, firstname, lastname, password} = this.form.value;
    const user = new User(
      email, firstname, lastname, password
    );
    this.userService.createUser(user)
      .subscribe((data: object) => {
        if (data) {
          if (data['error']) {
            this.showMessage({
              type: 'danger',
              text: data['error']
            });
          } else {
            this.authService.login();
            this.router.navigate(['/login']);
          }
        } else {
          this.showMessage({
            type: 'danger',
            text: 'error'
          });
        }
      })
  }
}
