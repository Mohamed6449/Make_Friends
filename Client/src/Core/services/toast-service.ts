import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  createToastContainer(){
    if(!document.getElementById('toast-container')){
      const container=document.createElement('div');
      container.id='toast-container';
      container.className='toast toast-bottom toast-end ';
      document.body.appendChild(container);
    }}
    createToastElement(message:string,duration:number=3000,alertClass:string){
      const container=document.getElementById('toast-container');
      if(!container)return;
      const toast=document.createElement('div');
      toast.classList.add('alert',alertClass,'mb-4','shadow-lg','fade-in');
      toast.innerHTML=`
      <span>${message}</span>
      <button class="btn btn-sm btn-ghost ml-4" ">✖</button>
      `;
      toast.querySelector('button')?.addEventListener('click',()=>{
        container!.removeChild(toast);
      });
      container!.appendChild(toast);
      setTimeout(()=>{
        if(container!.contains(toast)){
          container!.removeChild(toast);
        }
      },duration);
    }

    success(message:string,duration?:number){
      this.createToastElement(message,duration,'alert-success');
    }
    error(message:string,duration?:number){
      this.createToastElement(message,duration,'alert-error');
    }
    info(message:string,duration?:number){
      this.createToastElement(message,duration,'alert-info');
    }
    warning(message:string,duration?:number){
      this.createToastElement(message,duration,'alert-warning');
    }
  }
