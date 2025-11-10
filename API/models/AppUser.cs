
namespace API.models;

public class AppUser
{
    public string Id { get; set; }=Guid.NewGuid().ToString();
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}
