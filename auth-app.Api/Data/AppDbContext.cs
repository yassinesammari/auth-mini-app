using auth_app.Api.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace auth_app.Api.Data
{
    public class AppDbContext
    {
        private readonly IMongoDatabase _database;

        public AppDbContext(IOptions<MongoDBSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString);
            _database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
        }
        public IMongoDatabase Database => _database;
    }
}
