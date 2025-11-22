import { Injectable, signal } from '@angular/core';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount=signal(0);
  busy(){
    this.busyRequestCount.update(p=>p+1)
  }
  idle(){
    this.busyRequestCount.update(p=>Math.max(0,p-1))
  }

}


