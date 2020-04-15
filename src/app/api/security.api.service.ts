import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser} from '../interface/login-user';
import {LoginResponse} from '../interface/login-response';
import {RegisterUser} from '../interface/register-user';
import {BaseResponse} from '../interface/base-response';
import {ErrorResponse} from '../interface/error-response';
import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class SecurityApiService {
    private apiOptions = {
        headers: undefined
    };

    private apiUrl = 'http://friendfinder.api/api';

    constructor(private httpClient: HttpClient, private alertCtrl: AlertController) {
        this.httpClient = httpClient;

        this.apiOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    public login(userObj: LoginUser) {

        const request = this.httpClient.post(this.apiUrl + '/authenticate', userObj);

        request.subscribe((resultLogin: LoginResponse) => {

            console.log(resultLogin);

        }, error => {
            alert('error');
            console.log(error);
        });
    }

    public register(userObj: RegisterUser): Promise<BaseResponse> {

        return new Promise((resolve, reject) => {
            const request = this.httpClient.post(this.apiUrl + '/create', userObj);

            request.subscribe((resultLogin: BaseResponse) => {

                resolve(resultLogin);

            }, (errorResponse) => {
                const error: ErrorResponse = errorResponse.error;
                reject(error);
            });
        });
    }

    public async apiAlert(msg: string) {
        const alert = await this.alertCtrl.create({
            header: 'Authentication',
            message: msg,
            buttons: ['Ok']
        });

        return await alert.present();
    }
}
