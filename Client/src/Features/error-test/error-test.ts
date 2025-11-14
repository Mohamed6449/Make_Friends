import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-test',
  imports: [],
  templateUrl: './error-test.html',
  styleUrl: './error-test.css',
})
export class ErrorTest {
  private http = inject(HttpClient);
  router=inject(Router)
  base: string = 'https://localhost:7032/api/';
  getNotFound404() {
    this.http.get(this.base + 'buggy/not-found').subscribe({
      error: (e) => this.router.navigateByUrl('/notfound')
    });}

  getBadRequest400() {
    this.http.get(this.base + 'buggy/bad-request').subscribe({
      error:e=>{console.log(e);
      }
    })}

  getUnAuth401() {
    this.http.get(this.base + 'buggy/auth').subscribe({
      error:e=>console.log(e)
    })}
  getVaidationError400() {
    this.http.post(this.base + 'account/register', {}).subscribe({
      error: (e) => {
        console.log('error here');
        console.log(e);
      }
    })}
  getServerError() {
    this.http.get(this.base + 'buggy/server-error').subscribe({
      error: (e) => console.log(e),
    });
  }
}
