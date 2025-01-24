using DataAccess;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly Context _dbContext;

        public LoginController(Context dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest model)
        {
            // Check if the model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return validation errors
            }

            if (!model.Email.EndsWith("@gmail.com", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { Message = "Only Gmail addresses are allowed." });
            }

            // Find the user by email (or username, depending on your setup)
            var user = _dbContext.Registrations.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // Compare the entered password with the stored hash
            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return Unauthorized(new { Message = "Invalid email or password" });
            }

            // If the password is correct, proceed with login logic (e.g., generate a JWT token, etc.)
            return Ok(new { Message = "Login successful!" });
        }
    }
}
