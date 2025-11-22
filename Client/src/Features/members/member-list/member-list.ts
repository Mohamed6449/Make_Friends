import { Component, inject, signal } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, single } from 'rxjs';
import { member } from '../../../Types/member';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  memebers$:Observable<member[]>;
memberservice=inject(MemberService);

constructor() {

  this.memebers$=this.memberservice.getMemebers();

}

}
