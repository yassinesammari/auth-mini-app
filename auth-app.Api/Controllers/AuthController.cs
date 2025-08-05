using auth_app.Api.Model;
using auth_app.Api.Repository;
using auth_app.Api.Service;
using Microsoft.AspNetCore.Mvc;

namespace auth_app.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationInputDto request)
        {
            try
            {
                var existingUser = await _authService.GetUserByEmail(request.Email);
                if (existingUser != null)
                {
                    return Conflict("A user with this email already exists.");
                }

                var newUser = new User
                {
                    Email = request.Email,
                    Password = request.Password,
                    LastName = request.LastName,
                    FirstName = request.FirstName,
                    CreatedAt = DateTime.UtcNow
                };

                var id = await _authService.CreateNewUser(newUser);

                return CreatedAtAction(nameof(Register), new { id = id }, id);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while creating the user.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginInputDto request)
        {
            try
            {
                var user = new User
                {
                    Email = request.Email,
                    Password = request.Password,
                };

                var token = await _authService.AuthenticateUser(user);

                if (token == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                return Ok(new { token });
            }
            catch (Exception)
            {
                return StatusCode(500, "Unexpected error. Please try again later.");
            }
        }

    }
}
