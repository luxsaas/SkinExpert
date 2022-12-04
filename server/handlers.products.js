const { MongoClient } = require("mongodb");
const { userInfo } = require("os");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;
//get all products
const getProducts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
      const db = client.db("SkinExpert");
      const result = await db.collection("Products").find().toArray();
  
      client.close();
      if(result.length === 0){
        res.status(404).json({
          status: 404,
          message: "No items found",
        })
      }else{
        res.status(200).json({
          status: 200,
          data: result,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
    }
    };
//get information abt a specific product
const getProduct = async (req, res) => {
        const id=req.params;
        const client = new MongoClient(MONGO_URI, options);
        try {
          await client.connect();
          const db = client.db("SkinExpert");
          const result = await db.collection("Products").find(id).toArray();
      
          client.close();
          if(result.length === 0){
            res.status(404).json({
              status: 404,
              message: "No items found",
            })
          }else{
            res.status(200).json({
              status: 200,
              data: result,
            });
          }
        } catch (err) {
          res.status(400).json({
            status: 400,
            message: "Bad Request",
          });
        }
        };
//get items of a specific category
const getProductByCategory = async (req, res) => {
            const category=req.params;
            const client = new MongoClient(MONGO_URI, options);
            try {
              await client.connect();
              const db = client.db("SkinExpert");
              const result = await db.collection("Products").find(category).toArray();
          
              client.close();
              if(result.length === 0){
                res.status(404).json({
                  status: 404,
                  message: "No items found",
                })
              }else{
                res.status(200).json({
                  status: 200,
                  data: result,
                });
              }
            } catch (err) {
              res.status(400).json({
                status: 400,
                message: "Bad Request",
              });
            }
        };
//get items of a specific concern
const getProductByConcern = async (req, res) => {
                const {skin_concern}=req.params;
                let keys=[];
                let data =[];
                if(skin_concern=="Acne"){
                  keys.push("Acne");
                  keys.push("Blemishes");
                }
                else if(skin_concern=="Pores"){
                  keys.push("Pores");
                  keys.push("Uneven Texture")
                }
                else if(skin_concern=="Signs of Aging"){
                  keys.push("Signs of Aging");
                  keys.push("Loss of Firmness and Elasticity");
                }
                else if(skin_concern=="Dark Spots"){
                  keys.push("Dark Spots");
                }
                else if(skin_concern=="Fine Lines and Wrinkles"){
                  keys.push("Fine Lines and Wrinkles");
                }
                else if(skin_concern=="Dullness"){
                  keys.push("Dullness");
                }
                else if(skin_concern=="Puffy Eyes"){
                  keys.push("Puffiness");
                }
                else if(skin_concern=="Redness"){
                  keys.push("Redness");
                }
                else if(skin_concern=="Dryness"){
                  keys.push("Dryness");
                }
                else if(skin_concern=="Hyperpigmentation"){
                  keys.push("Uneven Skin Tone");
                }
                
                const client = new MongoClient(MONGO_URI, options);
                try {
                  await client.connect();
                  const db = client.db("SkinExpert");
                  const result = await db.collection("Products").find().toArray();
                  for(let i=0;i<result.length;i++){
                    for(let x=0;x<keys.length;x++){
                      if((result[i].skin_concerns).indexOf(keys[x])>=0){
                        data.push(result[i]);
                      }
                    }
                  }
                  if(data){
                    client.close();
                    res.status(200).json({
                      status: 200,
                      data: data,
                    });
                  }
                } catch (err) {
                  res.status(400).json({
                    status: 400,
                    message: err.message,
                  });
                }
            };
//get items of a specific brand
const getProductByBrand = async (req, res) => {
                const brand=req.params;
                const client = new MongoClient(MONGO_URI, options);
                try {
                  await client.connect();
                  const db = client.db("SkinExpert");
                  const result = await db.collection("Products").find(brand).toArray();
                  client.close();
                  if(result.length === 0){
                    res.status(404).json({
                      status: 404,
                      message: "No items found",
                    })
                  }else{
                    res.status(200).json({
                      status: 200,
                      data: result,
                    });
                  }
                } catch (err) {
                  res.status(400).json({
                    status: 400,
                    message: "Bad Request",
                  });
                }
            };
//get list of brands
const getBrands = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("SkinExpert");
        const data = await db.collection("Products").distinct('brand');
        if (data) {
            client.close();
            return(
            res.status(200).json({
            status: 200,
            data: data,
            })
            )
        }
        else{
            client.close();
            return(
            res.status(400).json({
            status: 400
            })
            )
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: "Bad Request",
        });
        }
        
};


module.exports = {
    getProducts,getProduct,getProductByCategory,getProductByConcern,getProductByBrand,
    getBrands
};
