import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    configUrl: string = "http://127.0.0.1:3000/auth";
    constructor(private http: HttpClient) { }

    SignInEntreprise(data: any) {
        return this.http.post<any>(`${this.configUrl}/entreprise`, data);
    }

    SignInPlayer(data: any) {
        return this.http.post<any>(`${this.configUrl}/player`, data);

    }
    SignUp(data: any) {
        return this.http.post<any>(`${this.configUrl}/register`, data);
    }

    SignUpFromLink(data: any) {
        return this.http.post<any>(`${this.configUrl}/link-register`, data);
    }
}