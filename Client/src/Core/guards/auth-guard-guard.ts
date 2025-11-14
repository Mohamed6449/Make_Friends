import { inject } from '@angular/core';
import { AccountService } from './../services/account-service';
import { CanActivateFn } from '@angular/router';
import { ToastService } from '../services/toast-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
 const accountService= inject(AccountService);
 const toast=inject(ToastService);
 if (accountService.currentUser()) {
   return true;
 }
 toast.error("You must be logged in to access this page", 3000);
 return false;
};

 
