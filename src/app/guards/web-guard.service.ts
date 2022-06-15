import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class WebGuardService implements CanActivate {
    constructor(public router: Router) { }

    canActivate(): boolean {
        console.log("Check if user loged => ", this.isAuthenticated())

        if (!this.isAuthenticated()) {
            this.router.navigate(['/auth']);
            return false;
        }
        return true;
    }

    isAuthenticated() {
        var e = localStorage.getItem("user");
        if (e)
            if (JSON.parse(e)) return true;
        return false;
    }
}