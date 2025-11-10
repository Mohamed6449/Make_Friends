using API.models;

namespace API.Services;

public interface ITokenService
{
    string CreateToken(AppUser user);
}
