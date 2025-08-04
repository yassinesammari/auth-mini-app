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
                    return Conflict(new RegistrationOutputDto
                    {
                        Result = false,
                        Message = "User already exists with this email."
                    });
                }

                var newUser = new User
                {
                    Email = request.Email,
                    Password = request.Password,
                    CreatedAt = DateTime.UtcNow
                };

                await _authService.CreateNewUser(newUser);

                return Ok(new RegistrationOutputDto
                {
                    Result = true,
                    Message = "User registered successfully."
                });
            }
            catch (Exception)
            {
                return BadRequest(new RegistrationOutputDto
                {
                    Result = false,
                    Message = "An error occurred during registration."
                });
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
                    return Unauthorized(new LoginOutputDto
                    {
                        Token = null,
                        Result = false,
                        Message = "Invalid email or password."
                    });
                }

                return Ok(new LoginOutputDto
                {
                    Token = token,
                    Result = true,
                    Message = "Login successful."
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new LoginOutputDto
                {
                    Token = null,
                    Result = false,
                    Message = "An unexpected error occurred. Please try again later."
                });
            }
        }

    }
}
