using System;
using API.Data;
using API.models;
using Microsoft.EntityFrameworkCore;

namespace API.Services.implements;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
  public async Task<Member?> GetMemberByIdAsync(string Id)
  {
    return await context.Members.Include(I=>I.appUser).FirstOrDefaultAsync(i=>i.Id==Id);
  }

  public async Task<IReadOnlyList<Member>> GetMembersAsync()
  {
    return await context.Members.ToListAsync();
  }

  public async Task<IReadOnlyList<Photo>> GetPhotosAsync(string MemberId)
  {
   return  await context.Members.Where(d=>d.Id==MemberId).Include(x=>x.photos).SelectMany(s=>s.photos).ToListAsync();
  }

  public async Task<bool> SaveAllChangesAsync()
  {
    return await context.SaveChangesAsync()>0;
  }

  public void Update(Member member)
  {
    context.Entry(member).State=EntityState.Modified;
  }
}
