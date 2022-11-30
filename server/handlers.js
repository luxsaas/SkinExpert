const { MongoClient } = require("mongodb");
const { userInfo } = require("os");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

const getCategory = async (req, res) => {
const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("SkinExpert");
    const data = await db.collection("Category").find().toArray();
    if (!data) {
        res.status(200).json({
        status: 200,
        data: data,
        });
    } 
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
    client.close();
};
const addCartItem = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newItem = req.body;
        await client.connect();
        const db = client.db("SkinExpert");

        await db.collection("Category").insertOne(newItem);
        client.close();
        return res.status(200).json({
            status: 200,
            message: "Item added to cart",
            data: newItem,
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
};

const getUser=async(req,res)=>{
    const user =req.params.user;
    const query={name:user};
    const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("SkinExpert");
    const data = await db.collection("Users").find(query).toArray();
    if (!data) {
        res.status(200).json({
        status: 200,
        message:"Success",
        data: data,
        });
    }else{
        res.status(200).json({
            status: 200,
            message:"Invalid User",
            data: data,
        })
    } 
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
    client.close();
}

const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newItem = req.body;
        await client.connect();
        const db = client.db("SkinExpert");
        console.log(newItem);
        await db.collection("Users").insertOne(newItem);
        client.close();
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: newItem,
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
};

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
    const getProduct = async (req, res) => {
        const id=req.params;
        console.log(id);
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
            const getProductByConcern = async (req, res) => {
                const skin_concerns=req.params;
                const client = new MongoClient(MONGO_URI, options);
                try {
                  await client.connect();
                  const db = client.db("SkinExpert");
                  const result = await db.collection("Products").inventory.aggregate( [ {
                    $project: {
                       index: { $indexOfArray: [ "$brand", skin_concerns ] }
                    }
                 } ] )
              
                  client.close();
                  console.log(result);
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

//--

const getPosts=async(req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
try { 
    await client.connect();
    const db = client.db("SkinExpert");
    const data = await db.collection("Posts").find().toArray();
    console.log(data);
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
    }))
    }
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
   
}
const addPost=async(req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newPost = req.body;
        console.log(newPost);
        await client.connect();
        const db = client.db("SkinExpert");
        if(newPost!=null){
        await db.collection("Posts").insertOne(newPost);
        client.close();
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: newPost,
        });
    }else{
        client.close();
        return res.status(400).json({
            status: 400,
            message: "UnSuccessful"
        });
    }
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
}
const addCurrentRoutine = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
        const {step}=req.params;
        const{activeUser}=req.params;
        let key="";
        const obj={};

        if(step=='cleanser'){
            key='Cleanser'
        }
        else if(step=='moisturizing-cream-oils-mists'){
            key='Moisturizer'
        }
        else if(step=='facial-treatments'){
            key='Treatment'
        }
        else if(step=='eye-treatment-dark-circle-treatment'){
            key='EyeCare'
        }
        else if(step=='facial-treatment-masks'){
            key='Mask'
        }
        else if(step =='sunscreen-sun-protection'){
            key='SunScreen'
        }
        else if(step=='lip-treatments'){
            key='LipCare'
        }
        console.log(key);
    try {
        const item = req.body;
        await client.connect();
        const db = client.db("SkinExpert");
        const user =await db.collection("Routine").findOne({user:activeUser});
        if(!user){
            const newItem={user:activeUser,[key]:item};
            await db.collection("Routine").insertOne(newItem);
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: newItem,
            });
        }
        else{
            const newItem={$set: {...{[key]:item}}};
            const query={user:activeUser};
            const result = await db.collection("Routine").updateOne(query, newItem);
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: result,
            });
        }

    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
}
const getRoutine=async(req,res)=>{
    const {activeUser}=req.params;
    const client = new MongoClient(MONGO_URI, options);
try { 
    await client.connect();
    const db = client.db("SkinExpert");
    const data = await db.collection("Routine").find({user:activeUser}).toArray();
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
    }))
    }
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
   
}

module.exports = {
    getCategory,
    addCartItem,
    getUser,addUser,getProducts,getProduct,getProductByCategory,getProductByConcern,getProductByBrand,
    getBrands,addCurrentRoutine,getRoutine,
    getPosts,addPost
};
