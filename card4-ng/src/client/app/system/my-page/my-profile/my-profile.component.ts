import {Component, Input} from '@angular/core';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  @Input() userData: any[] = [];

  constructor() {
  }

}
