using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Permissions;
using System.Text;
using API.models;
using Microsoft.IdentityModel.Tokens;


namespace API.Services.implements;

public class TokenServices(IConfiguration configuration) : ITokenService
{
  public string CreateToken(AppUser user)
  {
    var tokenConfig = configuration["JWT:SecretKey"]??throw new Exception("can not get token key");
    var tokenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenConfig));
     var Id = new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString());
 var claims = new List<Claim>()
     {
         new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Name, user.UserName!),
         Id,
     };
    var TokenOption = new JwtSecurityToken(expires: DateTime.UtcNow.AddDays(7), signingCredentials: new SigningCredentials(tokenKey, SecurityAlgorithms.HmacSha256));
    var Token=  new JwtSecurityTokenHandler().WriteToken(TokenOption);
    return Token;
  }
}
