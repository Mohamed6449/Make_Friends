using API.Data;
using API.Mapper;
using API.Middleware;
using API.Services;
using API.Services.implements;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<API.Services.interfaces.AccountInterface, API.Services.AccountServices>();
builder.Services.AddScoped<ITokenService,TokenServices>();
builder.Services.AddAutoMapper(typeof(mapeProfile));
builder.Services.AddScoped<IMemberRepository,MemberRepository>();
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
app.UseMiddleware<ExeptionMiddleware>();
app.UseCors(x=> 
    x.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200")
    );
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();

using (var scope=app.Services.CreateAsyncScope())
{   
    try
    {
        var mapper=scope.ServiceProvider.GetRequiredService<IMapper>();
        var context=scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await context.Database.MigrateAsync();
        await Seed.CreateSeedData(mapper,context);
        
    }
    catch (Exception ex)
    {
        var log =scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        log.LogError(ex.Message,"an error occured during migrtions");
        
    }
}   
app.Run();
