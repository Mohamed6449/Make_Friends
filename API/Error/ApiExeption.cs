using System;

namespace API.Error;

public class ApiExeption(int statusCodes,string message,string?detials)
{
  public int StatusCodes { get; set; } = statusCodes;

  public string Message { get; set; } = message;

  public string? Detials { get; set; } = detials;
}
