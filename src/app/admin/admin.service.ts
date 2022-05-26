import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root',
})
export class AdminService {
    configUrl: string = "http://127.0.0.1:3000";

    httpHeader: any = {};

    constructor(private http: HttpClient, private router: Router) {
        let userJson = this.getUserInfo();
        this.httpHeader.headers = new HttpHeaders({ "Authorization": `Bearer ${userJson.access_token}` });
    }

    getUserInfo() {
        let user = localStorage.getItem("user");
        return JSON.parse(user ?? "{}");
    }

    setUserInfo(data: any) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    /* ******* */
    getAllLeagues() {
        return this.http.get<any>(`${this.configUrl}/league`);
    }

    getLeagueDetails(id: any) {
        return this.http.get<any>(`${this.configUrl}/league/${id}`);
    }

    /* ******* */
    getRanking(id: number) {
        return this.http.get<any>(`${this.configUrl}/ranking/league/${id}`);
    }
    confirmJoin(data: any) {
        return this.http.post<any>(`${this.configUrl}/ranking/confirm`, data, this.httpHeader);
    }
}