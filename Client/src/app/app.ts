import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http=inject(HttpClient);
  data: string[] = [];
  ngOnInit(): void {
   this.http.get<string[]>(environment.base+'Member').subscribe({
     next: (members) => {
        this.data = members;
     }
   });
  }}
