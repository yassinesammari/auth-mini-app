using auth_app.Api.Model;
using auth_app.Api.Repository;

namespace auth_app.Api.Service
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// Get all users
        public async Task<List<User>> GetAllUsers()
        {
            var result = await _userRepository.GetAllUsers();
            return result;
        }

        // Get a user by id
        public async Task<User> GetUserById(Guid id)
        {
            var result = await _userRepository.GetUserById(id);
            return result;
        }
    }
}
