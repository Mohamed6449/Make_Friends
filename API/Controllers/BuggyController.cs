using System.Text.Json;
using API.DTO;
using API.models;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController(IMapper _mapper) : ControllerBase
  {
  
    [HttpGet("auth")]
    public IActionResult GetNotAuuthorized()
    {
        return Unauthorized();
    }
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    }
        [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new Exception("This is a server error");
    }
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("This is a bad request");
    }
    [HttpGet("test")]
    public async Task< ActionResult> test()
    {
    var dataFromFile= await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
    var membersDto=JsonSerializer.Deserialize<SeedDto[]>(dataFromFile);

     var componant = _mapper.Map<AppUser[]>(membersDto);
      return Ok();
    }
  }
}
