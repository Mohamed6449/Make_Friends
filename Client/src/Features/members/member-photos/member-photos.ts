import { photo } from './../../../Types/member';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../Core/services/member-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos {
route=inject(ActivatedRoute);
memberServic=inject(MemberService);
photos$:Observable<photo[]>;
dd=[2,3,3,33,3,3,3,3,4,6,7,8,90,0,0,6,6,66,6,6,6,6,66,6];
constructor() {


  this.photos$=this.memberServic.getPhotosByMemberId(this.route.parent?.snapshot.paramMap.get('id')||'')
}

}
