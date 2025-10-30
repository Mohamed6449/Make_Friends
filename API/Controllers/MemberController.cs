
using API.Data;
using API.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController(AppDbContext appDbContext) : ControllerBase
    {

        public async Task<IActionResult> GetMembersAsync()
        {
            // Sample data - in a real application, this would come from a database or service
            var members = await appDbContext.Users.ToListAsync();
            return Ok(members);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetMemberByIdAsync(string id)
        {
            var member = await appDbContext.Users.FirstOrDefaultAsync(f => f.Id == id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);
        }
    }
}
