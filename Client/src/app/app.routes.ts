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
import { MemberPhotos } from '../Features/members/member-photos/member-photos';
import { MemberMessages } from '../Features/members/member-messages/member-messages';
import { MemberProfile } from '../Features/members/member-profile/member-profile';
import { memberResolver } from '../Features/members/member-resolver';
import { preventFromLeaveGuard } from '../Core/guards/prevent-from-leave-guard';

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
  {
    path: 'members',
    component: MemberList,
    canActivate: [authGuardGuard],
  },
  {
    path: 'member/:id',
    component: MemberDetails,
    resolve: { member: memberResolver },
    runGuardsAndResolvers: 'always',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      {
        path: 'photos',
        component: MemberPhotos,
        title: 'Photos',
      },
      { path: 'messages', component: MemberMessages, title: 'Messages' },
      {
        path: 'profile',
        canDeactivate: [preventFromLeaveGuard],
        component: MemberProfile,
        title: 'Profile',
      },
    ],
  },
  { path: 'lists', component: Lists },
  { path: 'messages', component: Messages },
  { path: 'errors', component: ErrorTest },
  { path: 'notfound', component: NotFound },
  { path: 'serverErro', component: ServerError },

  { path: '**', redirectTo: 'notfound' },
];
