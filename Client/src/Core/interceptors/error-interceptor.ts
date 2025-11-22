import { AccountService } from './../services/account-service';
import { User } from './../../Types/User';
import { NavigationExtras, Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const route = inject(Router);
  const accountService=inject(AccountService)
  const user=accountService.currentUser();
  var modifiedReq=req.clone();
  if(user){
     modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

  }


  return next(modifiedReq ).pipe(
    catchError((e) => {
      if (e) {
        switch (e.status) {
          case 400:
            if (e.error && e.error.errors) {
              const modelStateErrors = [];
              for (const key in e.error.errors) {
                if (e.error.errors[key]) {
                  modelStateErrors.push(...e.error.errors[key]);
                }
              }
              throw modelStateErrors;
            } else {
              toast.error(e.error);
            }

            break;
          case 401:
            toast.error('Unauthorized');
            break;
          case 404:
            toast.error('not found');
            break;
          case 500:
            const navigationExtra: NavigationExtras = { state: { error: e.error } };
            route.navigateByUrl('/serverErro', navigationExtra);
            break;
          default:
            console.log(e);
            toast.error('something went wrong');
            break;
        }
      }

      throw console.error();
    })
  );
};

