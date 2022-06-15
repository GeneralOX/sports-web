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
    addLeague(data: any) {
        return this.http.post<any>(`${this.configUrl}/league`, data);
    }
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
    blockTeam(data: any) {
        return this.http.post<any>(`${this.configUrl}/ranking/block`, data, this.httpHeader);

    }

    /* ******* */
    loadTerrains() {
        return this.http.get<any>(`${this.configUrl}/field`);
    }
    addTerain(data: any) {
        return this.http.post<any>(`${this.configUrl}/field`, data, this.httpHeader);
    }
    deleteTerrain(id: any) {
        return this.http.delete<any>(`${this.configUrl}/field/${id}`, this.httpHeader);
    }
    /* ****** */
    getleagueData(id: any) {
        return this.http.get<any>(`${this.configUrl}/league/allData/${id}`, this.httpHeader);
    }
    getAvailableField(date: string) {
        return this.http.get<any>(`${this.configUrl}/field/available/${date}`, this.httpHeader);
    }


    /* ******* */
    addMatch(data: any) {
        return this.http.post<any>(`${this.configUrl}/match`, data, this.httpHeader);
    }
    setResult(data: any) {
        return this.http.post<any>(`${this.configUrl}/ranking/result`, { result: data }, this.httpHeader);
    }
}