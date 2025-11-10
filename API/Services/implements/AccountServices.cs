using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class AccountServices:interfaces.AccountInterface
{
    private readonly AppDbContext _context ;
    public AccountServices(AppDbContext context)
    {
        _context = context;
    }
    public async Task<bool>CheckEmailExists(string email)
    {
        return await _context.Users.AnyAsync(x=>x.Email!.ToLower()==email.ToLower());
    }
}
