using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.models;

public class Member
{
  public string Id { get; set; } = null!;
  public DateOnly DateOfBirth { get; set; }
  public string? ImageUrl { get; set; }
  public required string DisplayName { get; set; }
  public DateTime Created { get; set; } = DateTime.UtcNow;
  public DateTime LastActive { get; set; } = DateTime.UtcNow;
  public required string Gender { get; set; }
  public string? Description { get; set; }
  public required string City { get; set; }
  public required string Country { get; set; }

  [JsonIgnore]
  public ICollection<Photo> photos {get;set;}=null!;

  [JsonIgnore]
  [ForeignKey(nameof(Id))]
  public AppUser appUser { get; set; } = null!;

}
