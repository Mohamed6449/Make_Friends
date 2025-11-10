import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm, ɵInternalFormsSharedModule } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { single } from 'rxjs';
import { User, UserLogin } from '../../Types/User';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService=inject(AccountService);
  protected creds:UserLogin={} as UserLogin;

  Login(){
    this.accountService.Login(this.creds).subscribe({
      next:(res)=>{
         this.creds={} as UserLogin;
      },
      error:(err)=>{
        alert(err.error.toString()
        );
      }
    });

  }

  Logout(){
    this.accountService.Logout();
  }
}
