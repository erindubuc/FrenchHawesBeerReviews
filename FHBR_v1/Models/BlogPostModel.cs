using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson;

namespace FHBR_v1.Models
{
    public class BlogPost
    {
        [BsonId(IdGenerator = typeof(CombGuidGenerator))]
        public Guid Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }

        [BsonElement("By")]
        public string By { get; set; }

        [BsonElement("Content")]
        public string Content { get; set; }

        [BsonElement("Date")]
        public DateTime Date { get; set; }

    }
}
