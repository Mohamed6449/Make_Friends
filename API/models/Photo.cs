using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.models;

public class Photo
{
  public int Id { get; set; }
  public required string Url { get; set; }
  public string? PublicId  { get; set; }

  public string memberId {get;set;}=null!;
  [JsonIgnore]
  public Member member {get;set;}=null!;
}
