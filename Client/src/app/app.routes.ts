import { Register } from './../Features/Accont/register/register';
import { Routes } from '@angular/router';
import { Home } from '../Features/home/home';

export const routes: Routes = [
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'Home', component: Home,children:[{path:'Register',loadComponent:()=>import('../Features/Accont/register/register').then(m=>m.Register)}]}
];
