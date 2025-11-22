import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { error } from '../../../Types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected showDetail=false;
  protected errorInfo?:error={}as error;

private router=inject(Router);
constructor() {
  const error=this.router.currentNavigation()?.extras?.state?.["error"];
  console.log(error);
  this.errorInfo = {
    message: error?.['message'],
    statusCode: error?.['errorCodes'],
    details: error?.['detials'],
  };
}

showDetails(){
  this.showDetail=!this.showDetail;
}
}
