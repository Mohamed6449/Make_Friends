using System;
using API.models;

namespace API.Services.implements;

public interface IMemberRepository
{
  void Update(Member member);
  Task<bool> SaveAllChangesAsync();
  Task<IReadOnlyList<Member>> GetMembersAsync();
  Task<Member?> GetMemberByIdAsync(string Id);

  Task<IReadOnlyList<Photo>>GetPhotosAsync(string MemberId);
}
