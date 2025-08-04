using auth_app.Api.Model;
using auth_app.Api.Repository;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace auth_app.Api.Service
{
    public class AuthService
    {
        private readonly JwtConfig _jwtConfig;
        private readonly UserRepository _userRepository;

        public AuthService(IOptions<JwtConfig> jwtConfig, UserRepository userRepository)
        {
            _jwtConfig = jwtConfig.Value;
            _userRepository = userRepository;
        }

        // Generate a JWT token
        public string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim("id", user.Id),
                new Claim("Email", user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtConfig.Issuer,
                audience: _jwtConfig.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtConfig.ExpirationMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Authenticate user
        public async Task<string?> AuthenticateUser(User user)
        {
            var existingUser = await _userRepository.GetUserByEmail(user.Email);

            if (existingUser == null)
            {
                return null;
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password);
            if (!isPasswordValid)
            {
                return null;
            }

            var token = GenerateToken(existingUser);
            return token;
        }

        // Create a new user
        public async Task<bool> CreateNewUser(User user)
        {
            var existingUser = await _userRepository.GetUserByEmail(user.Email);
            if (existingUser != null)
            {
                return false; 
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _userRepository.CreateNewUser(user);

            return true;
        }

        // Get a user by email
        public async Task<User> GetUserByEmail(string email)
        {
            var result = await _userRepository.GetUserByEmail(email);
            return result;
        }
    }
}
