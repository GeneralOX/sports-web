import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) { }

    canActivate(): boolean {
        if (this.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }


    isAuthenticated() {
        var e = localStorage.getItem("user");
        console.log(e)
        if (e) {
            var user = JSON.parse(e);
            if (user) {
                return true;
            }
        }
        return false;
    }
}