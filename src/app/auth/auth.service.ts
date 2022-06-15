import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    configUrl: string = "http://127.0.0.1:3000/auth";
    constructor(private http: HttpClient, private router: Router) { }

    SignInAdmin(data: any) {
        return this.http.post<any>(`${this.configUrl}/admin`, data);
    }
    SignUpAdmin(data: any) {
        return this.http.post<any>(`${this.configUrl}/register-admin`, data);
    }

    /* ****** */
    SignInEntreprise(data: any) {
        return this.http.post<any>(`${this.configUrl}/entreprise`, data);
    }
    SignUp(data: any) {
        return this.http.post<any>(`${this.configUrl}/register`, data);
    }

    /* ****** */
    SignInPlayer(data: any) {
        return this.http.post<any>(`${this.configUrl}/player`, data);
    }
    SignUpFromLink(data: any) {
        return this.http.post<any>(`${this.configUrl}/link-register`, data);
    }

    // redirect to home screen
    redirect(data: any) {
        localStorage.setItem("user", JSON.stringify(data));
        this.router.navigate(["/app"]);
    }

    adminRedirect(data: any) {
        localStorage.setItem("admin", JSON.stringify(data));
        this.router.navigate(["/admin"]);
    }
}