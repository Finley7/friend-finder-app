import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../interface/login-user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser: LoginUser;

  constructor(private activeRouter: ActivatedRoute) {
    this.loginUser = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe(params => {
      console.log(params)
      if (params.email !== undefined) {
        this.loginUser.email = params.email;
      }
    });
  }

  login() {

  }
}
