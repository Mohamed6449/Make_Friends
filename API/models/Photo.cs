using System;

namespace API.models;

public class Photo
{
  public int Id { get; set; }
  public required string Url { get; set; }

  public string?  PublicId  { get; set; }
}
