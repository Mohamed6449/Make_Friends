import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EditableMember, member, photo } from '../../Types/member';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {

  client=inject(HttpClient);
  apiUrl=environment.apiUrl+'Member/';
  editMode=signal<boolean>(false);
  member=signal<member|null>(null);
  getMemebers(){
    return this.client.get<member[]>(this.apiUrl )
  }
  getMemberById(id:string){
    return this.client.get<member>(this.apiUrl+id).pipe(tap(t=>this.member.set(t)));
  }
  getPhotosByMemberId( id:string){
    console.log(this.client.get<photo[]>(this.apiUrl + id + 'photos'));

   return this.client.get<photo[]>(this.apiUrl + id + '/photos');
  }
  updateMember(member:EditableMember){
    return this.client.put(this.apiUrl,member);
  }
}
