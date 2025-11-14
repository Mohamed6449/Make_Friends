import { Register } from './../Features/Accont/register/register';
import { Routes } from '@angular/router';
import { Home } from '../Features/home/home';
import { MemberList } from '../Features/members/member-list/member-list';
import { MemberDetails } from '../Features/members/member-details/member-details';
import { Lists } from '../Features/members/lists/lists';
import { Messages } from '../Features/members/messages/messages';
import { authGuardGuard } from '../Core/guards/auth-guard-guard';
import { ErrorTest } from '../Features/error-test/error-test';
import { NotFound } from '../Shared/errors/not-found/not-found';
import { ServerError } from '../Shared/errors/server-error/server-error';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'Register',
        loadComponent: () => import('../Features/Accont/register/register').then((m) => m.Register),
      },
    ],
  },
  { path: 'members', component: MemberList, canActivate: [authGuardGuard] },
  { path: 'member/:id', component: MemberDetails },
  { path: 'lists', component: Lists },
  { path: 'messages', component: Messages },
  { path: 'errors', component: ErrorTest },
  { path: 'notfound', component: NotFound },
  { path: 'serverErro', component: ServerError },

  { path: '**', redirectTo: 'notfound' },
];
