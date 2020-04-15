import {Component, OnInit} from '@angular/core';
import {RegisterUser} from '../interface/register-user';
import {SecurityApiService} from '../api/security.api.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {BaseResponse} from '../interface/base-response';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerButtonText = 'Create my account';
    registerButtonLoading = false;

    constructor(private apiService: SecurityApiService, private router: Router, private alertCtrl: AlertController) {
        this.apiService = apiService;
        this.router = router;
        this.alertCtrl = alertCtrl;
    }

    registerUser: RegisterUser;

    ngOnInit() {
        this.registerUser = {
            name: '',
            email: '',
            password: ''
        };

    }

    async createAccount() {
        this.registerButtonText = 'Loading..';
        this.registerButtonLoading = true;

        if (this.registerUser.name === '' || this.registerUser.email === '' || this.registerUser.password === '') {
            await this.apiService.apiAlert('No valid data entered!');
        } else {

            this.apiService.register(this.registerUser).then(async response => {
                if (response.data === 'security.user.created') {
                    await this.apiService.apiAlert('The account has been created');
                    await this.router.navigate(['/login'], {queryParams: {email: this.registerUser.email}});
                } else {
                    await this.apiService.apiAlert('A unknown error has occured');

                    this.registerButtonText = 'Create my account';
                    this.registerButtonLoading = false;
                }
            }, async (error: BaseResponse) => {
                console.log(error);
                if (error.data === 'security.user.email_in_use') {
                    await this.apiService.apiAlert('This e-mail is already in use');

                    this.registerButtonText = 'Create my account';
                    this.registerButtonLoading = false;
                }
            });
        }
    }
}
