import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AdminGuardService implements CanActivate {
    constructor(public router: Router) { }

    canActivate(): boolean {
        console.log("is admin => ", this.isAuthenticated())
        if (!this.isAuthenticated()) {
            this.router.navigate(['/auth']);
            return false;
        }
        return true;
    }


    isAuthenticated() {
        var e = localStorage.getItem("admin");
        if (e)
            if (JSON.parse(e)) return true;
        return false;
    }
}