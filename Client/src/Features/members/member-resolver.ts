import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { MemberService } from '../../Core/services/member-service';
import { member } from '../../Types/member';
import { EMPTY } from 'rxjs';

export const memberResolver: ResolveFn<member> = (route, state) => {
 const memberService=inject(MemberService);
 const router=inject(Router);
 const id =route.paramMap.get('id');
 if(id){
  return memberService.getMemberById(id);
 }
 return EMPTY
};
