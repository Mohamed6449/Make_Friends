using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTO;
using API.models;
using AutoMapper;

namespace API.Data;

public static class Seed
{
  public static  async Task CreateSeedData( IMapper _mapper,AppDbContext context)
  {
    if (!context.Users.Any())
    {
      Console.WriteLine("i.m working");
      var dataFromFile= await File.ReadAllTextAsync("Data/UserSeedData.json");
      var membersDto=JsonSerializer.Deserialize<SeedDto[]>(dataFromFile);
      var componant = _mapper.Map<AppUser[]>(membersDto);
      foreach(var item in componant)
      {
      var hmac= new HMACSHA512();
          item.PasswordHash= hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
          item.PasswordSalt= hmac.Key ;
      }

       await context.Users.AddRangeAsync(componant);
       await context.SaveChangesAsync();
      
    }
  }
}
