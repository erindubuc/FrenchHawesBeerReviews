using MongoDB.Driver;
using BlogSetup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSetup
{
    public class MongoDbContext
    {
        public static string ConnectionString { get; set; }
        public static string Database { get; set; }
        public static bool IsSSL { get; set; }

        private IMongoDatabase _database;

        private IMongoDatabase Get_database()
        {
            return _database;
        }

        public MongoDbContext()
        {
            try
            {
                MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(ConnectionString));

                if (IsSSL)
                {
                    settings.SslSettings = new SslSettings { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls };
                }

                var mongoClient = new MongoClient(settings);
                _database = mongoClient.GetDatabase(Database);
            }
            catch (Exception ex)
            {

                throw new Exception("Can't access db server. " + ex.Message);
            }
        }

        public IMongoCollection<BlogPosts> Posts
        {
            get
            {
                return Get_database().GetCollection<BlogPosts>("Posts");
            }
        }
    }
}

