import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User, UserLogin, UserRegister } from '../../Types/User';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor() {
    const userString=localStorage.getItem('user');
    if (userString) {
      this.currentUser.set(JSON.parse(userString));
    }
  }
  private htttp=inject(HttpClient);
  base: string = environment.apiUrl;
  currentUser =signal<User|null>(null);
  Login(creds: UserLogin) {
    return this.htttp.post<User>(this.base+'account/login', creds).pipe(
      tap((user) => {
          this.seCurrentUser(user);
      })
    );
  }
  Logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  Register(creds:UserRegister) {
    return this.htttp.post<User>(this.base+'account/register', creds).pipe(
      tap((user) => {
        if (user){
          this.seCurrentUser(user);
        }
      })
    );

  }
  seCurrentUser(user:User){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user as User);
  }
}
