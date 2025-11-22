using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.models;
using API.Services;
using API.Services.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext appDbContext, AccountInterface accountServices,ITokenService tokenService) : BaseApiController
{

    [HttpPost("register")]
    // [Authorize]
    public async Task<ActionResult<AppUser>> Register([FromBody] RegisterDTO registerDTO)
    {
        if (await accountServices.CheckEmailExists(registerDTO.email!))
        {
            return BadRequest("Email is already in use");
        }
        var hmac = new HMACSHA512();
        var user = new AppUser()
        {
            UserName = registerDTO.userName,
            Email = registerDTO.email
            ,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.password!)),
            PasswordSalt = hmac.Key
        };
        await appDbContext.Users.AddAsync(user);
        await appDbContext.SaveChangesAsync();
        return Ok(user);
    }

    [HttpPost("Login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
  {
   var user = await appDbContext.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
   if (user == null)
   {
       return Unauthorized("Invalid Email");
   }
   using var hmac = new HMACSHA512(user.PasswordSalt);
   var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
   if (!computedHash.SequenceEqual(user.PasswordHash))
   {
       return Unauthorized("Invalid Password");
   }
   return Ok(new UserDto()
   {
       Email = user.Email!,
       UserName = user.UserName!,
       Id = user.Id,
         Token = tokenService.CreateToken(user),
         ImageUrl=user.ImageUrl
   });
  }

}
