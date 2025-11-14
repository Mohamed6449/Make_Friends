import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Nav } from "../Layout/nav/nav";
import { Router, RouterOutlet } from "@angular/router";
import { User } from '../Types/User';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ جمع ومصفوفة
})
export class App  {
  protected router=inject(Router);
}
