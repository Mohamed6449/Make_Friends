
using System.Security.Claims;
using API.DTO;
using API.models;
using API.Services.implements;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
        [Authorize]
    public class MemberController(IMemberRepository memberRepository ,IMapper mapper) : BaseApiController
    {

        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembersAsync()
        {
            // Sample data - in a real application, this would come from a database or service
            var members = await memberRepository.GetMembersAsync();
            return Ok(members);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMemberByIdAsync(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);
            if (member == null)
            {

                return NotFound("noooooo");
            }
           return member;
        }
        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotosByMemberId(string id)
    {
     return Ok(await memberRepository.GetPhotosAsync(id));
    }
        
    [HttpPut]
    public async Task<ActionResult> UpdateMember(UpdateMemberDto updateMemberDto)
    {
     var Id=User.FindFirstValue(ClaimTypes.NameIdentifier);
     if(Id==null)return NotFound("Oops Id not exist");
     var member=await memberRepository.GetMemberByIdAsync(Id);
     if(member==null)return BadRequest("could not get member");
     
     mapper.Map(updateMemberDto,member);
    memberRepository.Update(member);
     if(await memberRepository.SaveAllChangesAsync())return NoContent();
      
      return BadRequest("faild to update member");
    
    }




    }

}
