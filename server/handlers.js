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
const updateUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const name = req.params.name;
    const query = { name};
    const updatedOrder = { $set: { ...req.body } };

    await client.connect();
    const db = client.db("SkinExpert");

    if (name != null) {
      await db.collection("Users").updateOne(query, updatedOrder);
      res.status(200).json({ status: 200, ...req.body });
    } else {
      res.status(400).json({ status: 400, message: "Error!" });
    }
    client.close();
  } catch {
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
                      if(result[i].skin_concerns==undefined){
                        console.log("error" );
                        console.log(result[i]);
                      }
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
            key='Cleanser';
        }
        else if(step=='moisturizing-cream-oils-mists'){
            key='Moisturizer';
        }
        else if(step=='facial-treatments'){
            key='Treatment';
        }
        else if(step=='eye-treatment-dark-circle-treatment'){
            key='EyeCare';
        }
        else if(step=='facial-treatment-masks'){
            key='Mask';
        }
        else if(step =='sunscreen-sun-protection'){
            key='SunScreen';
        }
        else if(step=='lip-treatments'){
            key='LipCare';
        }
        else if(step=="Favorite"){
          key='Favorite';
        }
        else if(step=="Dislike"){
          key='Dislike'
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
            const result = await db.collection("Routine").updateOne(query, newItem,{upsert:true});
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
const deleteRoutine = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
      const {step}=req.params;
      const{activeUser}=req.params;
      let key="";

      if(step=='cleanser'){
          key='Cleanser';
      }
      else if(step=='moisturizing-cream-oils-mists'){
          key='Moisturizer';
      }
      else if(step=='facial-treatments'){
          key='Treatment';
      }
      else if(step=='eye-treatment-dark-circle-treatment'){
          key='EyeCare';
      }
      else if(step=='facial-treatment-masks'){
          key='Mask';
      }
      else if(step =='sunscreen-sun-protection'){
          key='SunScreen';
      }
      else if(step=='lip-treatments'){
          key='LipCare';
      }
  try {
      await client.connect();
      const db = client.db("SkinExpert");
      const user =await db.collection("Routine").findOne({user:activeUser});
      console.log(user);
      if(!user){
          await db.collection("Routine").deleteOne(user.key);
          client.close();
          return res.status(200).json({
              status: 200,
              message: "Success",
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
    getUser,addUser,updateUser,
    getProducts,getProduct,getProductByCategory,getProductByConcern,getProductByBrand,
    getBrands,addCurrentRoutine,getRoutine,deleteRoutine,
    getPosts,addPost
};
