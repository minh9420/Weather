import { Injectable } from "@angular/core";

const USERNAME = "username";
const PASSWORD = "password";
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor() { }
  
    signOut(): void {
      window.sessionStorage.clear();
    }
  
    public saveUser(username: string, password: string): void {
      window.sessionStorage.removeItem(USERNAME);
      window.sessionStorage.setItem(USERNAME, username);
      window.sessionStorage.removeItem(PASSWORD);
      window.sessionStorage.setItem(PASSWORD, password);
    }
  
    public getUser(): any {
      const username = window.sessionStorage.getItem(USERNAME);
      const password = window.sessionStorage.getItem(PASSWORD);
     return {username: username, password: password}
    }

    public isLogin(): boolean {
        const username = window.sessionStorage.getItem(USERNAME);
        const password = window.sessionStorage.getItem(PASSWORD);
        if (username == undefined || password == undefined) {
            return false;
        }
        return true;
    }
  }