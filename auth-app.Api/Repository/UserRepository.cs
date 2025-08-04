using auth_app.Api.Data;
using auth_app.Api.Model;
using MongoDB.Driver;

namespace auth_app.Api.Repository
{
    public class UserRepository
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserRepository(AppDbContext context)
        {
            _userCollection = context.Database.GetCollection<User>("user");
        }

        // Get all users
        public async Task<List<User>> GetAllUsers()
        {
            var result = await _userCollection.Find(user => true).ToListAsync();
            return result;
        }

        // Get a user by ID
        public async Task<User> GetUserById(string id)
        {
            return await _userCollection.Find<User>(user => user.Id == id).FirstOrDefaultAsync();
        }

        // Create new user
        public async Task CreateNewUser(User user)
        {
            await _userCollection.InsertOneAsync(user);
        }

        // Get a user by Email
        public async Task<User> GetUserByEmail(string email)
        {
            return await _userCollection.Find(user => user.Email == email).FirstOrDefaultAsync();
        }
    }
}
