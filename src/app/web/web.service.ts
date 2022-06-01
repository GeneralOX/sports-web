import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class WebService {
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
    getLeagueMatches(id: any) {
        return this.http.get<any>(`${this.configUrl}/league/matches/${id}`);
    }
    /* ******* */
    getAllMatches() {
        return this.http.get<any>(`${this.configUrl}/match`);
    }

    getMatchDetails(id: any) {
        return this.http.get<any>(`${this.configUrl}/match/${id}`);
    }
    /* ******* */
    createTeam(name: string) {
        console.log(this.httpHeader)
        return this.http.post<any>(`${this.configUrl}/team`, { name }, this.httpHeader);
    }
    deleteTeam(id: number) {
        return this.http.delete<any>(`${this.configUrl}/team/${id}`, this.httpHeader);
    }
    addPlayerToTeam(data: any) {
        return this.http.post<any>(`${this.configUrl}/user/add`, data, this.httpHeader);
    }
    deletePlayer(id: number) {
        return this.http.delete<any>(`${this.configUrl}/user/${id}`, this.httpHeader);
    }
    getTeamDetails(id: number) {
        return this.http.get<any>(`${this.configUrl}/team/${id}`, this.httpHeader);
    }
    /* ******* */
    joinLeague(data: any) {
        return this.http.post<any>(`${this.configUrl}/ranking/join`, data, this.httpHeader);
    }
    getLeagueRank(id: any) {
        return this.http.get<any>(`${this.configUrl}/ranking/league/${id}`, this.httpHeader);
    }
    /* ****** */

    setLeader(data: any) {
        return this.http.put<any>(`${this.configUrl}/user/leader/change`, data, this.httpHeader);
    }
    updateUserData(data: any) {
        return this.http.patch(`${this.configUrl}/user`, data, this.httpHeader)
    }


    getEntredata() {
        return this.http.get<any>(`${this.configUrl}/user/entreprise`, this.httpHeader)
    }
    updateEntrepriseData(data: any) {
        return this.http.patch<any>(`${this.configUrl}/user/entreprise`, data, this.httpHeader)
    }
}