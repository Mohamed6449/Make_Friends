import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Nav } from "../Layout/nav/nav";
import { RouterOutlet } from "@angular/router";
import { User } from '../Types/User';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ جمع ومصفوفة
})
export class App implements OnInit {
  http = inject(HttpClient);
  protected members=signal<User[]>([]) ;
  protected title = 'Make Friends';
  async ngOnInit() {
    // ✅ await هنا داخل try/catch يلتقط الأخطاء من الـ Promise
    try {
      const data = await this.getMembers();
      this.members.set(data);
    } catch (error) {
      console.error('Failed to load members:', error);
    }
  }

  async getMembers(): Promise<User[]> {
    try {
      // ✅ استخدام firstValueFrom
      return await firstValueFrom(this.http.get<User[]>('https://localhost:7032/api/member'));
    } catch (error) {
      console.error('Error fetching members:', error);
      return [];
    }
  }
}
