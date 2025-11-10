import { AccountService } from './../../../Core/services/account-service';
import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRegister } from '../../../Types/User';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  AccountService = inject(AccountService);
  protected creds ={} as UserRegister;

  Register() {
    this.AccountService.Register(this.creds).subscribe({
      next: (user) => {
        console.log('User registered successfully:', user);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }
  @Output() onCancel=new EventEmitter<boolean>();
  Cancel(){
    this.onCancel.emit(false);
  }

}
