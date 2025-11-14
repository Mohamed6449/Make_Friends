import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm, ɵInternalFormsSharedModule } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { single } from 'rxjs';
import { User, UserLogin } from '../../Types/User';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../Core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService=inject(AccountService);
  protected creds:UserLogin={} as UserLogin;
  protected router=inject(Router);
  protected toast=inject(ToastService);
  Login(){
    this.accountService.Login(this.creds).subscribe({
      next:(res)=>{
         this.creds={} as UserLogin;
         this.router.navigateByUrl('/members');
         this.toast.success('login successful',3000);
      },
      error:(err)=>{
        console.log("mook");

        this.toast.error(err.error,30000);
      }
    });

  }

  Logout(){
    this.accountService.Logout();
    this.router.navigateByUrl('/');
  }
}
