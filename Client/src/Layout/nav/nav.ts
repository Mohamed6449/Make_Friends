import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm, ɵInternalFormsSharedModule } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { single } from 'rxjs';
import { User, UserLogin } from '../../Types/User';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../Core/services/toast-service';
import { themes } from '../themes';
import { BusyService } from '../../Core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  ngOnInit(): void {
    this.selectedTheme.set(localStorage.getItem('theme')||'light')
    document.documentElement.setAttribute('data-theme',this.selectedTheme())
  }
  protected busyService=inject(BusyService)
  protected accountService = inject(AccountService);
  protected creds: UserLogin = {} as UserLogin;
  protected router = inject(Router);
  protected toast = inject(ToastService);
  selectedTheme=signal<string>(localStorage.getItem('theme')||'light');
  themes=themes;

  changeTheme(theme:string){
    localStorage.setItem('theme',theme);
    document.documentElement.setAttribute('data-theme',theme)
    this.selectedTheme.set(theme);
   const ele= document.activeElement as HTMLDivElement
    if(ele)ele.blur();
  }

  Login() {
    this.accountService.Login(this.creds).subscribe({
      next: (res) => {
        this.creds = {} as UserLogin;
        this.router.navigateByUrl('/members');
        this.toast.success('login successful', 3000);
      },
      error: (err) => {
        console.log('mook');

        this.toast.error(err.error, 30000);
      },
    });
  }
  close(){
       const ele = document.activeElement as HTMLDivElement;
       if (ele) ele.blur();
  }
  Logout() {
    this.accountService.Logout();
    this.router.navigateByUrl('/');
  }
}
