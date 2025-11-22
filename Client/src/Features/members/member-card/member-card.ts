import { single } from 'rxjs';
import { member } from './../../../Types/member';
import { Component, input, Input, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AgePipe } from "../../../Core/pipes/age-pipe";

@Component({
  selector: 'app-member-card',
  imports: [RouterLink, AgePipe],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  member=input.required<member>() ;
}
