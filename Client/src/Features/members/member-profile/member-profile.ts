import { Component, HostListener, inject, OnDestroy, signal, ViewChild, viewChild } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, member } from '../../../Types/member';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../Core/services/toast-service';
import { EMPTY } from 'rxjs';
import { AccountService } from '../../../Core/services/account-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  memberService = inject(MemberService);
  toast = inject(ToastService);
  route = inject(ActivatedRoute);
  accountService=inject(AccountService)

  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }

  protected editMember?: EditableMember;
  constructor() {

      this.editMember = {
        displayName: this.memberService.member()?.displayName || '',
        country: this.memberService.member()?.country || '',
        city: this.memberService.member()?.city || '',
        description: this.memberService.member()?.description,
      };
    };
  ngOnDestroy(): void {
    this.memberService.editMode.set(false);
  }
  updateMember() {

    if (!this.memberService.member()) return;
    this.memberService.updateMember(this.editMember!).subscribe(()=>{
        const updatedMember = { ...this.memberService.member(), ...this.editMember };
        this.memberService.member.set(updatedMember as member)
        this.memberService.editMode.set(false);
        let user=this.accountService.currentUser();
        if(user){
          user.userName = updatedMember.displayName ?? user?.userName;
          this.accountService.seCurrentUser(user);
        }
        this.toast.success('Updated successfuly');
        this.editForm?.reset(updatedMember)
    });
  }
}
