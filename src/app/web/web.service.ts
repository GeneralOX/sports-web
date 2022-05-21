import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class WebService {
    configUrl: string = "http://127.0.0.1:3000";
    constructor(private http: HttpClient, private router: Router) { }

    getAllLeagues() {
        return this.http.get<any>(`${this.configUrl}/league`);
    }

    getLeagueDetails(id: any) {
        return this.http.get<any>(`${this.configUrl}/league/${id}`);
    }

    getAllMatches() {
        return this.http.get<any>(`${this.configUrl}/match`);
    }

    getMatchDetails(id: any) {
        return this.http.get<any>(`${this.configUrl}/match/${id}`);
    }
}