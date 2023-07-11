import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { isAuthenticated } from "../helpers/auth.helper";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(
        private router: Router
    ) {
    }

    canActivate() {
        if (isAuthenticated())
            return true;
        else {
            this.router.navigate(['/home/login']);
            return false;
        }
    }
}