using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class RegistrationController : ControllerBase
    {

        private readonly Context _dbContext;

        public RegistrationController(Context dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("Register")]
        public IActionResult Register([FromBody] Registration model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return validation errors
            }
            if (!model.Email.EndsWith("@gmail.com", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { Message = "Only Gmail addresses are allowed." });
            }
            // Hash the password before saving
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);
          //  var chashedPassword = BCrypt.Net.BCrypt.HashPassword(model.ConfirmPassword);

            // Create a new Reg entity
            var user = new Registration
            {
                Email = model.Email,
                Password = hashedPassword, // Save the hashed password
        //        ConfirmPassword = chashedPassword, // Optionally, you can hash this too if needed
            };

            try
            {
                _dbContext.Registrations.Add(user);
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { Message = ex.InnerException?.Message ?? ex.Message });
            }

            return Ok(new { Message = "Registration successful!" });
        }

    }



}
