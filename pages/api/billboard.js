// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.urlDB;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

export default function handler(req, res) {
   
    client.connect(err => {
        const collection = client.db("dridy").collection("stock");
        // perform actions on the collection object
      
        //console.log(collection.find())
        
        collection.aggregate([
          {
            $lookup:
            {
              from: "like",
              localField: "videoId", // field in the stock collection
              foreignField: "videoId",// field in the like collection
              as: "inventory_docs"
            }
          }
        ]).sort( { "update_dt": 1 } )

        .toArray(function (err, result) {
          if (err) throw err;
          res.statusCode = 200
          console.log(result)
          res.status(200).json(result)
        });
        
        //client.close();
      });
  }
  



// const users = [{ id: 1 }, { id: 2 }, { id: 3 }]

// export default function handler(req, res) {
//   // Get data from your database
//   res.status(200).json(users)
// }