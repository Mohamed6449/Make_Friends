using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.DTO;

public class LoginDto
{
  [Required]
  [EmailAddress]
  public string Email { get; set; } = "";

  [Required]
  [MinLength(6)]
  [DataType(DataType.Password)]
  public string Password { get; set; } = "";
}
