import { member } from './../../../Types/member';
import { Component, inject, signal, OnInit, OnChanges, SimpleChanges, AfterViewChecked, isSignal, AfterViewInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterState, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { MemberService } from '../../../Core/services/member-service';
import { filter, Observable, single } from 'rxjs';
import { AgePipe } from "../../../Core/pipes/age-pipe";
import { AccountService } from '../../../Core/services/account-service';
@Component({
  selector: 'app-member-details',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-details.html',
  styleUrl: './member-details.css',
})
export class MemberDetails  {
  memberService = inject(MemberService);
  accountService=inject(AccountService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  title=signal<string|undefined>('profile');
  isCurrentUser:any;
  isProfile=signal<boolean>(false);

  constructor() {
    this.activeRoute.data.subscribe(data=>this.memberService.member.set(data['member']))
    this.router.events.pipe(filter( d=>d instanceof NavigationEnd)).subscribe(
      d=>{
        this.title.set(this.activeRoute.firstChild?.snapshot.title)
        this.isProfile.set( this.activeRoute.firstChild?.snapshot.title == 'Profile' ? true : false);
        this.checkCurrentUser();

      });

  }
  changeEditMode(){
    this.memberService.editMode.set(!this.memberService.editMode())
  }
  checkCurrentUser(){
 this.activeRoute.paramMap.subscribe(
   (s) =>
     (this.isCurrentUser = computed(() => {
      return (
         this.accountService.currentUser()?.id === this.activeRoute.snapshot.paramMap.get('id') &&
         this.isProfile()
       );
     }))
 );
  }




}
