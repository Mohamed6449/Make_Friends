using System.Net;
using System.Text.Json;
using API.Error;

namespace API.Middleware;
public class ExeptionMiddleware(RequestDelegate next,
ILogger<ExeptionMiddleware> logg, IHostEnvironment environment)
{
  public async Task InvokeAsync(HttpContext context)
  {
    try
    {
      await next(context);
    }
    catch (Exception ex)
    {
      logg.LogError(ex, ex.Message);
      context.Response.ContentType = "application/json";
      context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
      var Responseee = (environment.IsDevelopment()) ? new ApiExeption(context.Response.StatusCode, ex.Message, ex.StackTrace) :
      new ApiExeption(context.Response.StatusCode, ex.Message, "internal server error");

      var option = new JsonSerializerOptions()
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      };
      var json = JsonSerializer.Serialize(Responseee, option);
      await context.Response.WriteAsync(json);
    }
  }
}
