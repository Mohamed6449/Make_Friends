using API.Data;
using API.Services;
using API.Services.implements;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddScoped<API.Services.interfaces.AccountInterface, API.Services.AccountServices>();
builder.Services.AddScoped<ITokenService,TokenServices>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.RequireHttpsMetadata = false;
    o.SaveToken = true;
    var tokenKey = builder.Configuration["JWT:SecretKey"]??throw new Exception("can not get token key");
    o.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenKey)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
  

});
builder.Services.AddDbContext<AppDbContext>(option=>
{
    option.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
var app = builder.Build();


app.UseCors(x=> 
    x.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200")
    );
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();
app.Run();
