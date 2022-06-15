import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) { }

    canActivate(): boolean {
        console.log("is user", this.isUserAuth())
        console.log("is admin", this.isAdminAuth())
        
        if (this.isUserAuth()) {
            this.router.navigate(['/app']);
            return false;
        }

        if (this.isAdminAuth()) {
            this.router.navigate(['/admin']);
            return false;
        }
        return true;
    }

    isUserAuth() {
        var e = localStorage.getItem("user");
        if (e)
            if (JSON.parse(e)) return true;
        return false;
    }

    isAdminAuth() {
        var e = localStorage.getItem("admin");
        if (e)
            if (JSON.parse(e)) return true;
        return false;
    }
}