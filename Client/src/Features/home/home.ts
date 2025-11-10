import { Component, signal } from '@angular/core';
import { Register } from "../Accont/register/register";

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  regigesterMode = signal(false);

  showRegister() {
    this.regigesterMode.set(true);
  }
  CancelRegister(){
    this.regigesterMode.set(false);
  }
}
